import { useOrderPrice } from "~/composables/order";
export default defineEventHandler(async (event) => {
  const user = await useUser(event);
  const body = await readBody(event);
  const { addressId, couponId } = body;
  if (!addressId || typeof addressId !== "string") {
    throw createError({
      statusCode: 400,
      message: "addressId is required",
    });
  }
  // get cart items
  const cartItems = await useGetCartItems(user.id);

  if (couponId && typeof couponId !== "string") {
    throw createError({
      statusCode: 400,
      message: "couponId is required",
    });
  }

  const coupon = await usePrisma.coupon.findUniqueOrThrow({
    where: {
      id: couponId,
    },
    include: {
      openTo: true,
      CouponCondition: true,
    },
  });

  // convert to order items
  const orderItems = convertToOrderItems(cartItems);
  const totalWithoutCoupon = useOrderPrice(orderItems).totalOrder;
  const validCoupon = await validateCoupon(coupon, user, totalWithoutCoupon);
  const { totalOrder, totalDelivery, discount } = useOrderPrice(
    orderItems,
    validCoupon
  );

  if (discount > 0) {
    await usePrisma.couponUsage.create({
      data: {
        couponId: coupon.id,
        userId: user.id,
      },
    });
  }

  
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
        Authorization: `Bearer sk_live_8fea11d7337a3a9bd794ab4d4ed71534c6f88c4f`,
      },
      body: {
        email: user.email,
        amount: totalOrder * 100,
      },
    }
  );

  // order items to create stage

  const orderItemsToCreate = useOrderItemsToCreate(orderItems);
  // create order
  const createOrderPromise = usePrisma.order.create({
    data: {
      userId: user.id,
      total: totalOrder,
      deliveryCost: totalDelivery,
      reference: paystack.data.reference,
      verificationCode: generateRandomCode(6),
      paymentUrl: paystack.data.authorization_url,
      items: {
        create: orderItemsToCreate,
      },
      addressId,
    },
  });

  // delete cart items
  const deleteCartItemsPromise = usePrisma.cartItem.deleteMany({
    where: {
      userId: user.id,
    },
  });

  await Promise.all([createOrderPromise, deleteCartItemsPromise]);

  return paystack.data.authorization_url;
});
