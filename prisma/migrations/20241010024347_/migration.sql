/*
  Warnings:

  - You are about to drop the column `commentId` on the `likes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,replyId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "likes" DROP COLUMN "commentId",
ADD COLUMN     "replyId" INTEGER;

-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "likesCount" INTEGER DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_replyId_key" ON "likes"("userId", "replyId");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
