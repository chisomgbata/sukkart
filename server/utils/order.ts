export const useGetCartItems = async (userId: string) => {
  const cartItems = await db
    .select({
      quantity: cartItemTable.quantity,
      costPrice: productTable.costPrice,
      id: productTable.id,
      sellingPrice: productTable.sellingPrice,
    })
    .from(cartItemTable)
    .where(eq(cartItemTable.userId, userId))
    .innerJoin(productTable, eq(productTable.id, cartItemTable.productId))
    .all();
  return cartItems;
};

export const convertToOrderItems = (
  cartItems: {
    id: number;
    costPrice: number;
    sellingPrice: number | null;
    quantity: number;
  }[]
) => {
  return cartItems.map((item) => ({
    price: item.sellingPrice || calcPrice(item.costPrice),
    productId: item.id,
    quantity: item.quantity,
  }));
};

export function generateRandomCode(length: number) {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var code = "";
  for (var i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
