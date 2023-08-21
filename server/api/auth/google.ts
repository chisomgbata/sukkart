import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const body = getQuery(event);
  const code = body.code?.toString();
  const baseUrl = useRuntimeConfig().public.baseUrl;

  if (!code) {
    throw createError({
      statusCode: 400,
      message: "Invalid code",
    });
  }
  const response = await $fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    query: {
      code,
      client_id:
        "629319720255-tmknbjp73la50vq1fckg3evd3t0sc0s4.apps.googleusercontent.com",
      grant_type: "authorization_code",
      client_secret: "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",
      redirect_uri: `${baseUrl}/api/auth/google`,
    },
  });

  const { id_token } = response as {
    access_code: string;
    id_token: string;
  };
  const user = jwt.decode(id_token) as {
    email: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
  };

  const [createOrUpdateUser] = await db
    .insert(userTable)
    .values({
      id: generateId(),
      email: user.email,
      avatar: user.picture,
      firstName: user.given_name,
      lastName: user.family_name,
    })
    .onConflictDoUpdate({
      target: userTable.email,
      set: {
        avatar: user.picture,
        firstName: user.given_name,
        lastName: user.family_name,
      },
    })
    .returning()
    .all();

  await loginUser(createOrUpdateUser, event);
  return sendRedirect(event, "/");
});
