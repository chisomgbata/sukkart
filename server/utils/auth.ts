import bcrypt from "bcrypt";
import { H3Event } from "h3";
import { User } from "server/utils/schema";
export const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const hash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const useUser = async (event: H3Event) => {
  const auth_token = getCookie(event, "auth_token");
  if (!auth_token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "You are not authorized to access this resource",
    });
  }
  const user = verifyToken(auth_token);
  return user;
};

export const loginUser = async (user: User, event: H3Event) => {
  const token = createToken(user);
  setCookie(event, "auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 * 4, // 4 weeks
    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 4),
  });
  return verifyToken(token);
};
