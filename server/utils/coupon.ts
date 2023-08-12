import { Coupon, User, CouponCondition } from "@prisma/client";
interface User2 {
  id: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
}
export const validateCoupon = async (
  coupon: Coupon & {
    openTo: User[];
    CouponCondition: CouponCondition | null;
  },
  user: User2,
  total: number
) => {
  if (!coupon.openToAll) {
    if (!user) {
      throw createError({
        message: "You must be logged in to use this coupon",
        statusCode: 403,
      });
    }

    if (!coupon.openTo.some((openTo) => openTo.id === user.id)) {
      throw createError({
        message: "You are not allowed to use this coupon",
        statusCode: 403,
      });
    }
  }

  if (coupon.status !== "PUBLISHED") {
    throw createError({
      message: "Invalid coupon",
      statusCode: 404,
    });
  }

  const couponUsage = await usePrisma.couponUsage.findFirst({
    where: {
      couponId: coupon.id,
      userId: user.id,
    },
  });

  if (couponUsage) {
    throw createError({
      message: "You have already Applied this coupon",
      statusCode: 400,
    });
  }

  if (coupon.CouponCondition) {
    const couponCondition = coupon.CouponCondition;
    if (couponCondition.minAmount && total < couponCondition.minAmount) {
      throw createError({
        message:
          "Coupon not valid for orders lower than " + couponCondition.minAmount,
        statusCode: 400,
      });
    }

    if (couponCondition.maxAmount && total > couponCondition.maxAmount) {
      throw createError({
        message:
          "Coupon not valid for orders higher than " +
          couponCondition.maxAmount,
        statusCode: 400,
      });
    }
  }

  return {
    value: coupon.value,
    type: coupon.type,
    id: coupon.id,
  };
};
