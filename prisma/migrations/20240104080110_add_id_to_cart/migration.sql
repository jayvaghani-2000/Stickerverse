/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `cart` table. All the data in the column will be lost.
  - The `cartId` column on the `cartItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "cartItem" DROP CONSTRAINT "cartItem_cartId_fkey";

-- DropIndex
DROP INDEX "cart_userId_key";

-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "cartItem" DROP COLUMN "cartId",
ADD COLUMN     "cartId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "cartItem_cartId_stickerId_key" ON "cartItem"("cartId", "stickerId");

-- AddForeignKey
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
