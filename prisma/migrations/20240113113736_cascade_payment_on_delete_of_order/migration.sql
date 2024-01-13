-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_paymentId_fkey";

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
