/*
  Warnings:

  - You are about to drop the column `userId` on the `threads` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_userId_fkey";

-- AlterTable
ALTER TABLE "threads" DROP COLUMN "userId",
ADD COLUMN     "AuthorId" INTEGER;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
