import type { OrderInsert } from "~/server/utils/schema";
export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const user = await useUser(event);
  const body = await readBody(event);

  const validateBody = z
    .object({
      addressId: z.number(),
    })
    .safeParse(body);

  if (!validateBody.success) {
    throw createError({
      message: "Invalid body",
      statusCode: 400,
      data: validateBody.error.flatten().fieldErrors,
    });
  }

  const { addressId } = validateBody.data;

  // get cart items
  const cartItems = await useGetCartItems(user.id);

  // convert to order items
  const orderItems = convertToOrderItems(cartItems);
  // const totalWithoutCoupon = useOrderPrice(orderItems).totalOrder;
  // const validCoupon = await validateCoupon(coupon, user, totalWithoutCoupon);
  const total = orderItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  // if (discount > 0) {
  //   await usePrisma.couponUsage.create({
  //     data: {
  //       couponId: coupon.id,
  //       userId: user.id,
  //     },
  //   });
  // }

  interface paystackResponse {
    status: boolean;
    message: string;
    data: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
  }
  // send request to paystack
  const paystack = await $fetch<paystackResponse>(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${runtimeConfig.paystackSecret}`,
      },
      body: {
        email: user.email,
        amount: total * 100,
      },
    }
  );

  const orderToCreate: OrderInsert = {
    userId: user.id,
    total: total,
    reference: paystack.data.reference,
    id: generateId(),
    verificationCode: generateRandomCode(6),
    paymentUrl: paystack.data.authorization_url,
    addressId,
  };

  const createOrderPromise = db.insert(orderTable).values(orderToCreate);

  const deleteCartItemsPromise = db
    .delete(cartItemTable)
    .where(eq(cartItemTable.userId, user.id));

  await Promise.all([createOrderPromise, deleteCartItemsPromise]);

  return paystack.data.authorization_url;
});
