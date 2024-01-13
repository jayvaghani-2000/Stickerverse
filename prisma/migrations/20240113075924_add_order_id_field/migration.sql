/*
  Warnings:

  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderUniqId]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderUniqId` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "orderUniqId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_orderUniqId_key" ON "payment"("orderUniqId");
