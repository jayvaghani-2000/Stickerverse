/*
  Warnings:

  - A unique constraint covering the columns `[wishlistId,stickerId]` on the table `wishlistItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "wishlistItem_wishlistId_stickerId_key" ON "wishlistItem"("wishlistId", "stickerId");
