import { requestSchema } from "~/zod/request";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const request = requestSchema.safeParse(body);
  if (!request.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid request",
    });
  }
  const { name, email, phoneNumber, message } = request.data;

  const createCustomRequest = await usePrisma.customRequest.create({
    data: {
      name,
      email,
      phone: phoneNumber,
      message,
    },
  });

  return createCustomRequest;
});
