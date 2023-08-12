export default defineEventHandler(async (event) => {
  const user = await useUser(event);

  const addresses = await db
    .select({
      id: addressTable.id,
      phoneNumber: addressTable.phoneNumber,
      lodge: addressTable.lodge,
      area: addressTable.area,
    })
    .from(addressTable)
    .where(eq(addressTable.user, user.id))
    .all();
  return addresses;
});
