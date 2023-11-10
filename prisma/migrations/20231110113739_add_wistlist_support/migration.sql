-- CreateTable
CREATE TABLE "wistlist" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "wistlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wistlistItem" (
    "id" SERIAL NOT NULL,
    "wistlistId" INTEGER NOT NULL,
    "stickerId" INTEGER NOT NULL,

    CONSTRAINT "wistlistItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wistlist" ADD CONSTRAINT "wistlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wistlistItem" ADD CONSTRAINT "wistlistItem_wistlistId_fkey" FOREIGN KEY ("wistlistId") REFERENCES "wistlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wistlistItem" ADD CONSTRAINT "wistlistItem_stickerId_fkey" FOREIGN KEY ("stickerId") REFERENCES "sticker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
