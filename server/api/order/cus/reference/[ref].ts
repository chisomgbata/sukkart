export default defineEventHandler(async (event) => {
  const user = await useUser(event);
  console.log(user);
  const ref = event.context.params?.ref;

  if (!ref || typeof ref != "string") {
    console.log(ref);
    throw createError({
      statusCode: 400,
      message: "error",
    });
  }

  const [order] = await db
    .select()
    .from(orderTable)
    .where(and(eq(orderTable.reference, ref), eq(orderTable.userId, user.id)))
    .leftJoin(addressTable, eq(orderTable.addressId, addressTable.id))
    .all();

  return order;
});
