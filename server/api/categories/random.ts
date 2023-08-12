export default defineEventHandler(async (event) => {
  // return a random category from the database
  const totalCategories = await usePrisma.category.count({
    where: {
      status: "PUBLISHED",
    },
  });
  const category = await usePrisma.category.findFirst({
    where: {
      status: "PUBLISHED",
    },
    skip: Math.floor(Math.random() * totalCategories),
    include: {
      products: {
        include: {
          ProductImages: true,
        },
      },
    },
  });

  if (!category) {
    throw createError({
      statusCode: 404,
      message: "Category not found",
    });
  }

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    image: category.image,
    products: category.products.map((product) => {
      return minimalProductTransform(product);
    }),
  };
});
