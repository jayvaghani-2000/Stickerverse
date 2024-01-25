-- CreateEnum
CREATE TYPE "orderDeliveryStatus" AS ENUM ('ordered', 'shipped', 'delivered');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "deliveryStatus" "orderDeliveryStatus";
