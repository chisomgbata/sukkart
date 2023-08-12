import { sql } from "drizzle-orm";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.product;
  const validSlug = z.string().min(1).parse(slug);

  const [product] = await db
    .select({
      id: productTable.id,
      name: productTable.name,
      slug: productTable.slug,
      description: productTable.description,
      costPrice: productTable.costPrice,
      sellingPrice: productTable.sellingPrice,
      image: productTable.image,
      images: sql<string | null>`GROUP_CONCAT(${productImagesTable.image})`,
    })
    .from(productTable)
    .where(eq(productTable.slug, validSlug))
    .leftJoin(
      productImagesTable,
      eq(productImagesTable.productId, productTable.id)
    )
    .all();
  return {
    ...product,
    images: product.images?.split(",") || [],
    price: product.sellingPrice || calcPrice(product.costPrice),
    sellingPrice: undefined,
    costPrice: undefined,
  };
});
