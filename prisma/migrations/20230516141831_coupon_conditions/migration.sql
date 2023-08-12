/*
  Warnings:

  - You are about to drop the column `endDate` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Coupon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "endDate",
DROP COLUMN "startDate";

-- CreateTable
CREATE TABLE "CouponCondition" (
    "id" TEXT NOT NULL,
    "couponId" TEXT NOT NULL,
    "minAmount" INTEGER,
    "maxAmount" INTEGER,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CouponCondition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CouponCondition_couponId_key" ON "CouponCondition"("couponId");

-- AddForeignKey
ALTER TABLE "CouponCondition" ADD CONSTRAINT "CouponCondition_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
