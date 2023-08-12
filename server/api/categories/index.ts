export default defineEventHandler(async () => {
  const categories = await db.select().from(categoryTable).all();
  return categories;
});
