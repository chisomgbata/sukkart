export default defineEventHandler(async (event) => {
  const user = await useUser(event);
  console.log(user);
  const ref = event.context.params?.ref;

  if (!ref || typeof ref != "string") {
    console.log(ref);
    throw createError({
      statusCode: 400,
      message: "error",
    });
  }
  console.log(ref);

  const order = await usePrisma.order.findFirst({
    where: {
      reference: ref,
      userId: user.id,
    },
    include: {
      Address: true,
    },
  });

  return order;
});
