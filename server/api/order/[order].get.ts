export default defineEventHandler(async (event) => {
  const user = await useUser(event);
  console.log(user);
  const order = event.context.params?.order;
  if (!order || typeof order !== "string") {
    throw createError({
      statusCode: 400,
      message: "order is required",
    });
  }

  const [orderDetails] = await db
    .select({
      id: orderTable.id,
      status: orderTable.status,
      total: orderTable.total,
      reference: orderTable.reference,
      verificationCode: orderTable.verificationCode,
      type: orderTable.type,
      paymentUrl: orderTable.paymentUrl,
      address: {
        phoneNumber: addressTable.phoneNumber,
        lodge: addressTable.lodge,
        area: addressTable.area,
      },
      items: sql<string>`JSON_GROUP_ARRAY(JSON_OBJECT('price', ${orderItemTable.price}, 'quantity', ${orderItemTable.quantity}, 'image', ${productTable.image}, 'name', ${productTable.name}, 'slug', ${productTable.slug}, 'description', ${productTable.description}))`,
      createdAt: orderTable.createdAt,
    })
    .from(orderTable)
    .where(and(eq(orderTable.id, order), eq(orderTable.userId, user.id)))
    .innerJoin(addressTable, eq(addressTable.id, orderTable.addressId))
    .innerJoin(orderItemTable, eq(orderItemTable.orderId, orderTable.id))
    .innerJoin(productTable, eq(productTable.id, orderItemTable.productId))
    .all();

  interface item {
    price: number;
    quantity: number;
    image: string;
    name: string;
    slug: string;
    description: string;
  }

  return { ...orderDetails, items: JSON.parse(orderDetails.items) as item[] };
});
