/*
  Warnings:

  - You are about to drop the `Promo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Promo" DROP CONSTRAINT "Promo_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sellingPrice" INTEGER DEFAULT 0;

-- DropTable
DROP TABLE "Promo";
