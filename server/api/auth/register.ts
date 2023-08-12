import { RegisterUserCheck } from "~/zod/authUser";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validatedBody = RegisterUserCheck.safeParse(body);
  if (!validatedBody.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid body",
      data: validatedBody.error.flatten().fieldErrors,
    });
  }

  const { email, password, firstName, lastName } = validatedBody.data;
  const [user] = await db
    .insert(userTable)
    .values([
      {
        id: generateId(),
        email: email,
        firstName,
        lastName,
        password: await hash(password),
      },
    ])
    .returning()
    .all()
    .catch((error) => {
      if (error.code == "SQLITE_CONSTRAINT_UNIQUE") {
        throw createError({
          statusCode: 400,
          message: "Email already exists",
        });
      }
      throw createError({
        statusCode: 500,
        message: "Something went wrong",
      });
    });

  const loggedInUser = await loginUser(user, event);
  return loggedInUser;
});
