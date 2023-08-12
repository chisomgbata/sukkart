export default defineEventHandler(async () => {
  // const proudcts = await usePrisma.product.findMany({
  //   take: 12,
  //   include: {
  //     ProductImages: true,
  //   },
  //   where: {
  //     status: "PUBLISHED",
  //   },
  // });
  const products = await db
    .select({
      id: productTable.id,
      name: productTable.name,
      slug: productTable.slug,
      sellingPrice: productTable.sellingPrice,
      costPrice: productTable.costPrice,
      image: productTable.image,
    })
    .from(productTable)
    .limit(12)
    .all();
  return productsTransform(products);
});
