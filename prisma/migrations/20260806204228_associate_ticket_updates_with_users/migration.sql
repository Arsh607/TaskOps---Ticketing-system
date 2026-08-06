/*
  Warnings:

  - You are about to drop the column `appUserId` on the `TicketUpdate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TicketUpdate" DROP CONSTRAINT "TicketUpdate_appUserId_fkey";

-- DropIndex
DROP INDEX "TicketUpdate_appUserId_idx";

-- AlterTable
ALTER TABLE "AppUser" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "KanbanTask" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TicketUpdate" DROP COLUMN "appUserId",
ADD COLUMN     "clerkUserId" TEXT;

-- CreateIndex
CREATE INDEX "TicketUpdate_clerkUserId_idx" ON "TicketUpdate"("clerkUserId");

-- AddForeignKey
ALTER TABLE "TicketUpdate" ADD CONSTRAINT "TicketUpdate_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "AppUser"("clerkUserId") ON DELETE SET NULL ON UPDATE CASCADE;
