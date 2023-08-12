export default defineEventHandler(async (event) => {
  const user = await useUser(event);
  const cart = await db
    .select({
      quantity: cartItemTable.quantity,
      product: {
        id: productTable.id,
        name: productTable.name,
        sellingPrice: productTable.sellingPrice,
        costPrice: productTable.costPrice,
        slug: productTable.slug,
        image: productTable.image,
        stock: productTable.stock,
      },
    })
    .from(cartItemTable)
    .where(eq(cartItemTable.userId, user.id))
    .innerJoin(productTable, eq(cartItemTable.productId, productTable.id))
    .all();

  return cart.map(({ product, quantity }) => {
    return {
      quantity: quantity,
      ...minimalProductTransform(product),
    };
  });
});
