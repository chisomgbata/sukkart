import { z } from "zod";

export default defineEventHandler(async (event) => {
  const user = await useUser(event);
  const body = await readBody(event);

  const { code, total } = z
    .object({
      code: z.string(),
      total: z.number(),
    })
    .parse(body);
  const coupon = await usePrisma.coupon.findUniqueOrThrow({
    where: {
      code,
    },
    include: {
      openTo: true,
      CouponCondition: true,
    },
  });
  return await validateCoupon(coupon, user, total);
});
