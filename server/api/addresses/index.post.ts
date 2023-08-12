import { addressCheck } from "~/zod/address";
export default defineEventHandler(async (event) => {
  const user = await useUser(event);
  const body = await readBody(event);
  const validatedBody = addressCheck.safeParse(body);
  if (!validatedBody.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid Request",
    });
  }

  const [address] = await db
    .insert(addressTable)
    .values({
      ...validatedBody.data,
      user: user.id,
    })
    .returning()
    .all();

  return address;
});
