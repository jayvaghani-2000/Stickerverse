-- AlterTable
ALTER TABLE "order" ADD COLUMN     "deliveryAddressId" UUID;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_deliveryAddressId_fkey" FOREIGN KEY ("deliveryAddressId") REFERENCES "userAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
