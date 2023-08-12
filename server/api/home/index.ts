export default defineEventHandler(async (event) => {
  const products = await db
    .select({
      id: productTable.id,
      name: productTable.name,
      slug: productTable.slug,
      description: productTable.description,
      costPrice: productTable.costPrice,
      sellingPrice: productTable.sellingPrice,
      image: productTable.image,
    })
    .from(productTable)
    .limit(10)
    .all();

  return productsTransform(products);
});
