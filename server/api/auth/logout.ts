export default defineEventHandler(async (event) => {
  setCookie(event, "auth_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
    expires: new Date(Date.now() - 1000),
  });
  return "logged out";
});
