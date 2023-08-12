export default defineEventHandler(async (event) => {
  const slug = event.context.params?.category;
  if (!slug)
    throw createError({
      statusCode: 400,
      message: "Missing category slug",
    });

  const [category] = await db
    .select({
      id: categoryTable.id,
      name: categoryTable.name,
      slug: categoryTable.slug,
      image: categoryTable.image,
      products: sql<string>`JSON_GROUP_ARRAY(JSON_OBJECT('id', ${productTable.id}, 'name', ${productTable.name}, 'slug', ${productTable.slug}, 'image', ${productTable.image}, 'sellingPrice', ${productTable.sellingPrice}, 'costPrice', ${productTable.costPrice})) `,
    })

    .from(categoryTable)
    .leftJoin(
      productCategoryTable,
      eq(categoryTable.id, productCategoryTable.categoryId)
    )
    .leftJoin(productTable, eq(productCategoryTable.productId, productTable.id))
    .where(eq(categoryTable.slug, slug.toString()))
    .all();

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    image: category.image,
    products: productsTransform(JSON.parse(category.products)),
  };
});
