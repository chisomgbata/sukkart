export default defineEventHandler(async (event) => {
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
  const total = orderItems.reduce((acc, item) => {
    return acc + item.sellingPrice * item.quantity;
  }, 0);
  // const validCoupon = await validateCoupon(coupon, user, totalWithoutCoupon);
  // const { totalOrder, discount } = useOrderPrice(
  //   orderItems,
  // );

  // if (discount > 0) {
  //   await usePrisma.couponUsage.create({
  //     data: {
  //       couponId: coupon.id,
  //       userId: user.id,
  //     },
  //   });
  // }

  const reference = generateRandomCode(10);
  const verificationCode = generateRandomCode(6);
  const orderItemsToCreate = useOrderItemsToCreate(orderItems);

  const order = await db.transaction(async (tx) => {
    const [createOrder] = await tx
      .insert(orderTable)
      .values({
        id: generateId(),
        userId: user.id,
        total: total,
        reference,
        verificationCode,
        type: "PAY_ON_DELIVERY",
        addressId: addressId,
      })
      .returning({ id: orderTable.id })
      .all();

    const finalItems = orderItemsToCreate.map((item) => ({
      ...item,
      orderId: createOrder.id,
    }));

    await Promise.all([
      await tx.insert(orderItemTable).values(finalItems).run(),
      await tx
        .delete(cartItemTable)
        .where(eq(cartItemTable.userId, user.id))
        .run(),
    ]);
    return createOrder;
  });

  return order;
});
