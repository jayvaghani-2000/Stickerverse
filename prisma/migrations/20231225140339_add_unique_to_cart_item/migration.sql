/*
  Warnings:

  - A unique constraint covering the columns `[cartId,stickerId]` on the table `cartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cartItem_cartId_stickerId_key" ON "cartItem"("cartId", "stickerId");
