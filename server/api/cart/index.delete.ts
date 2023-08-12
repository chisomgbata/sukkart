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

  const { productId } = validateRequest.data;

  await db
    .delete(cartItemTable)
    .where(
      and(
        eq(cartItemTable.productId, productId),
        eq(cartItemTable.userId, user.id)
      )
    )
    .run();

  return "deleted";
});
