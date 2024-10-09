/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[threadId]` on the table `threads` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_threadId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_commentId_fkey";

-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "threadId" INTEGER;

-- DropTable
DROP TABLE "Comment";

-- CreateIndex
CREATE UNIQUE INDEX "threads_threadId_key" ON "threads"("threadId");
