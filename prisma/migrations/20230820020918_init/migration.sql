-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageURLs" TEXT[],
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 99,
    "tags" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
