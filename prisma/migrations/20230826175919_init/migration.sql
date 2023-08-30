-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "priceJPY" INTEGER NOT NULL,
    "priceCAD" INTEGER NOT NULL,
    "priceUSD" INTEGER NOT NULL,
    "priceGBP" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 99,
    "tags" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
