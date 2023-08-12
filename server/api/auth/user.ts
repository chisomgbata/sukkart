export default defineEventHandler(async (event) => {
  const user = await useUser(event);
  return user;
});
