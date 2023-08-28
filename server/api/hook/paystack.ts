import { createHmac } from "crypto";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const secretKey = useRuntimeConfig().paystackSecret;
  const hash = createHmac("sha512", secretKey)
    .update(JSON.stringify(body))
    .digest("hex");
  const payStackSignature = getHeader(event, "x-paystack-signature");

  if (hash !== payStackSignature) {
    throw createError({
      statusCode: 400,
      message: "Invalid signature",
    });
  } else {
    // process payment
    if (body.event === "charge.success") {
      // process payment
      const referencecode = body.data.reference;
      // await usePrisma.order.update({
      //   where: {
      //     reference: referencecode,
      //   },
      //   data: {
      //     status: "PAID",
      //   },
      // });

      await db
        .update(orderTable)
        .set({
          status: "PAID",
        })
        .where(eq(orderTable.reference, referencecode))
        .run();

      //   send notification to staffs
      // TODO: send notification to staffs

      //   send notification to user
      // TODO: send notification to user

      return "success";
    }
  }
});
