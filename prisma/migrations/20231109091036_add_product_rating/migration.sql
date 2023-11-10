/*
  Warnings:

  - Added the required column `offer` to the `sticker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sticker" ADD COLUMN     "offer" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "rating" (
    "id" UUID NOT NULL,
    "value" INTEGER NOT NULL,
    "userId" UUID NOT NULL,
    "stickerId" INTEGER NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_stickerId_fkey" FOREIGN KEY ("stickerId") REFERENCES "sticker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
