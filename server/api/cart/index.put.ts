import { z } from "zod";

export default defineEventHandler(async (event) => {
  const user = await useUser(event).catch(() => {
    const guestCookie = getCookie(event, "guest_id");
    if (!guestCookie) {
      // throw an error since you can't update a cart that doesn't exist
      throw createError({
        message: "Cart not found",
        statusCode: 404,
      });
    }
    return {
      id: guestCookie,
    };
  });
  const body = await readBody(event);

  const validateRequest = z
    .object({
      productId: z.number(),
      quantity: z.number().min(1),
    })
    .safeParse(body);

  if (!validateRequest.success) {
    throw createError({
      message: "Invalid request body",
      statusCode: 400,
      data: validateRequest.error.flatten().fieldErrors,
    });
  }

  const { productId, quantity } = validateRequest.data;

  await db
    .update(cartItemTable)
    .set({
      quantity,
    })
    .where(
      and(
        eq(cartItemTable.productId, productId),
        eq(cartItemTable.userId, user.id)
      )
    )
    .run();

  return "updated";
});
