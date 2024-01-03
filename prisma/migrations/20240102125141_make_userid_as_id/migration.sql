-- DropIndex
DROP INDEX "cart_userId_key";

-- AlterTable
ALTER TABLE "cart" ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("userId");
