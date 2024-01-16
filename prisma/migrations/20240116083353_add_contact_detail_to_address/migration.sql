-- AlterTable
ALTER TABLE "userAddress" ADD COLUMN     "contact" TEXT,
ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT;
