/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `sticker` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sticker" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "sticker_slug_key" ON "sticker"("slug");
