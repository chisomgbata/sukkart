import { User } from "server/utils/schema";
import jwt from "jsonwebtoken";
export const createToken = (user: User) => {
  const jwtSecret = useRuntimeConfig().jwtSecret;
  const { id, email, avatar, firstName, lastName } = user;
  const token = jwt.sign(
    { id, email, firstName, lastName, avatar },
    jwtSecret,
    {
      expiresIn: "4w",
    }
  );
  return token;
};

export const verifyToken = (token: string) => {
  const jwtSecret = useRuntimeConfig().jwtSecret;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { id, email, avatar, firstName, lastName } = decoded as User;
    return { id, email, avatar, firstName, lastName };
  } catch (error) {
    throw new Error("Invalid Token");
  }
};
