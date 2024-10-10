-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_replyId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_threadId_fkey";

-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "threadId" DROP NOT NULL,
ALTER COLUMN "replyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
