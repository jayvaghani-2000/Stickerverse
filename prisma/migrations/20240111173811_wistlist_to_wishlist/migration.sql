/*
  Warnings:

  - You are about to drop the column `wistlistId` on the `wishlistItem` table. All the data in the column will be lost.
  - Added the required column `wishlistId` to the `wishlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "wishlistItem" DROP CONSTRAINT "wishlistItem_wistlistId_fkey";

-- AlterTable
ALTER TABLE "wishlistItem" DROP COLUMN "wistlistId",
ADD COLUMN     "wishlistId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "wishlistItem" ADD CONSTRAINT "wishlistItem_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "wishlist"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
