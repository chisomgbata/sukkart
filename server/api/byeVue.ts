export default defineEventHandler(async (event) => {
  return {
    result: await db.select().from(userTable).all(),
  };
});
