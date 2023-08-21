export default defineEventHandler(async (event) => {
  //   return sendRedirect(event, "https://www.google.com");
  const query = getQuery(event);
  const cookies = parseCookies(event);
  return {
    query,
    cookies,
  };
});
