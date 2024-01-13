/*
  Warnings:

  - Added the required column `status` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "orderPaymentStatus" AS ENUM ('pending', 'confirmed');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "status" "orderPaymentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "orderId" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "orderPaymentStatus" NOT NULL;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
