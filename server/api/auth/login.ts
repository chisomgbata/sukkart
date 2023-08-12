import { loginUserCheck } from "~/zod/authUser";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validatedBody = loginUserCheck.safeParse(body);
  if (!validatedBody.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid Request Body",
    });
  }

  const { email, password } = validatedBody.data;
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .all();

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid Credentials",
    });
  }

  if (user.password === null) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Use Google to login",
    });
  }

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid Credentials",
    });
  }

  const loggedInUser = await loginUser(user, event);

  return loggedInUser;
});
