/*
  Warnings:

  - Made the column `replyId` on table `likes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_replyId_fkey";

-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "replyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "reply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
