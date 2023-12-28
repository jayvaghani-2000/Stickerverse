/*
  Warnings:

  - A unique constraint covering the columns `[visitorId,stickerId]` on the table `cartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "cartItem" DROP CONSTRAINT "cartItem_cartId_fkey";

-- AlterTable
ALTER TABLE "cartItem" ADD COLUMN     "visitorId" UUID,
ALTER COLUMN "cartId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "visitorCart" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "stickerId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "visitorCart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cartItem_visitorId_stickerId_key" ON "cartItem"("visitorId", "stickerId");

-- AddForeignKey
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "visitorCart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitorCart" ADD CONSTRAINT "visitorCart_stickerId_fkey" FOREIGN KEY ("stickerId") REFERENCES "sticker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
