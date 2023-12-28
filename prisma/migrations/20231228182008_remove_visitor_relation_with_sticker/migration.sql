/*
  Warnings:

  - You are about to drop the column `quantity` on the `visitorCart` table. All the data in the column will be lost.
  - You are about to drop the column `stickerId` on the `visitorCart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "visitorCart" DROP CONSTRAINT "visitorCart_stickerId_fkey";

-- AlterTable
ALTER TABLE "visitorCart" DROP COLUMN "quantity",
DROP COLUMN "stickerId";
