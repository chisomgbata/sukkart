import { z } from "zod";

export default defineEventHandler(async (event) => {
  const user = await useUser(event);
  const body = await readBody(event);

  const validateRequest = z
    .object({
      productId: z.number(),
    })
    .safeParse(body);

  if (!validateRequest.success) {
    throw createError({
      message: "Invalid request body",
      statusCode: 400,
      data: validateRequest.error.flatten().fieldErrors,
    });
  }

  await db
    .insert(cartItemTable)
    .values({
      userId: user.id,
      productId: validateRequest.data.productId,
      quantity: 1,
    })
    .onConflictDoNothing()
    .run()
    .catch((e) => {
      if (e.code == "FOREIGN_KEY_CONSTRAINT") {
        throw createError({
          message: "Invalid product",
          statusCode: 400,
        });
      }
      throw e;
    });

  return "added to cart";
});
