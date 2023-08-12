/*
  Warnings:

  - A unique constraint covering the columns `[productId,image]` on the table `ProductImages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductImages_productId_image_key" ON "ProductImages"("productId", "image");
