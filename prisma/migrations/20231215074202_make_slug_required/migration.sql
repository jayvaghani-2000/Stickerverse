/*
  Warnings:

  - Made the column `slug` on table `sticker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "sticker" ALTER COLUMN "slug" SET NOT NULL;
