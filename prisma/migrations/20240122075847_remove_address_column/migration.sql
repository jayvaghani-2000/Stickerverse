/*
  Warnings:

  - You are about to drop the column `address` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "address";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "address";
