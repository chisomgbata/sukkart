/*
  Warnings:

  - Made the column `minAmount` on table `CouponCondition` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CouponCondition" ALTER COLUMN "minAmount" SET NOT NULL;
