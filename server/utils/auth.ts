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

  // check for guestid id, if it exists migrate the cart to the user and delete the guest id cookie and the guest cart
  const guestId = getCookie(event, "guest_id");
  if (guestId) {
    const cartItems = await db
      .select({
        productId: cartItemTable.productId,
        quantity: cartItemTable.quantity,
      })
      .from(cartItemTable)
      .where(eq(cartItemTable.userId, guestId))
      .all();

    setCookie(event, "guest_id", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      expires: new Date(Date.now() - 1000),
    });

    if (cartItems.length === 0) return verifyToken(token);

    // delete the user cart items, so that we can insert the newly created ones, because they might have different quantities and the user might not want to  keep some of the old items and avoid mistakenly checking out with them

    await db.transaction(async (tx) => {
      await tx
        .delete(cartItemTable)
        .where(eq(cartItemTable.userId, user.id))
        .run();

      await tx
        .delete(cartItemTable)
        .where(eq(cartItemTable.userId, guestId))
        .run();

      await tx
        .insert(cartItemTable)
        .values(cartItems.map((item) => ({ ...item, userId: user.id })))
        .onConflictDoNothing()
        .run();
    });
  }

  return verifyToken(token);
};
