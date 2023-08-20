import { nanoid } from "nanoid";
import { z } from "zod";

export const generateId = () => nanoid();

export const calcPrice = (costPrice: number) => Math.ceil(costPrice * 1.13);

export { z };

export async function getCart(userId: string) {
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
    .where(eq(cartItemTable.userId, userId))
    .innerJoin(productTable, eq(cartItemTable.productId, productTable.id))
    .all();

  return cart.map(({ product, quantity }) => {
    return {
      quantity: quantity,
      ...minimalProductTransform(product),
    };
  });
}
