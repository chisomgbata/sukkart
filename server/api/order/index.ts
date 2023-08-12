export default defineEventHandler(async (event) => {
  const user = await useUser(event);

  const orders = await db
    .select({
      id: orderTable.id,
      createdAt: orderTable.createdAt,
      status: orderTable.status,
      total: orderTable.total,
      reference: orderTable.reference,
    })
    .from(orderTable)
    .where(eq(orderTable.userId, user.id))
    .orderBy(desc(orderTable.createdAt))
    .all();

  return orders;
});
