-- CreateTable
CREATE TABLE "shortUrl" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shortUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shortUrl_url_key" ON "shortUrl"("url");

-- CreateIndex
CREATE UNIQUE INDEX "shortUrl_shortUrl_key" ON "shortUrl"("shortUrl");
