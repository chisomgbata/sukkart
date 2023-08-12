-- CreateTable
CREATE TABLE "Promo" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "promoPrice" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Promo_slug_key" ON "Promo"("slug");

-- AddForeignKey
ALTER TABLE "Promo" ADD CONSTRAINT "Promo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
