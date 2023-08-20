export default defineEventHandler(async (event) => {
  const user = await useUser(event).catch(() => {
    // since there is no user, check for a guest cookie and if there is no guest cookie, create one and return an empty cart
    const guestCookie = getCookie(event, "guest_id");
    if (!guestCookie) {
      // return null since there is no user and no guest cookie and we can't create a guest cookie because the user is not adding to cart
      return null;
    }
    return {
      id: guestCookie,
    };
  });

  if (!user) return [];
  return await getCart(user.id);
});
