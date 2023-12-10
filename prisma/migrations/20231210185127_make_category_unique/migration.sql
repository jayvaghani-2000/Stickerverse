/*
  Warnings:

  - A unique constraint covering the columns `[categoryName]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "category_categoryName_key" ON "category"("categoryName");
