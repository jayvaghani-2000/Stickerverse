/*
  Warnings:

  - You are about to drop the `avatar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wistlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wistlistItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "avatar" DROP CONSTRAINT "avatar_userId_fkey";

-- DropForeignKey
ALTER TABLE "wistlist" DROP CONSTRAINT "wistlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "wistlistItem" DROP CONSTRAINT "wistlistItem_stickerId_fkey";

-- DropForeignKey
ALTER TABLE "wistlistItem" DROP CONSTRAINT "wistlistItem_wistlistId_fkey";

-- DropTable
DROP TABLE "avatar";

-- DropTable
DROP TABLE "wistlist";

-- DropTable
DROP TABLE "wistlistItem";

-- CreateTable
CREATE TABLE "wishlist" (
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "wishlistItem" (
    "id" SERIAL NOT NULL,
    "wistlistId" UUID NOT NULL,
    "stickerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wishlistItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlistItem" ADD CONSTRAINT "wishlistItem_wistlistId_fkey" FOREIGN KEY ("wistlistId") REFERENCES "wishlist"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlistItem" ADD CONSTRAINT "wishlistItem_stickerId_fkey" FOREIGN KEY ("stickerId") REFERENCES "sticker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
