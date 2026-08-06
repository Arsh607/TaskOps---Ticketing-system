-- AlterTable
ALTER TABLE "KanbanTask"
ADD COLUMN "appUserId" INTEGER;

-- CreateIndex
CREATE INDEX "KanbanTask_appUserId_idx" ON "KanbanTask"("appUserId");

-- AddForeignKey
ALTER TABLE "KanbanTask"
ADD CONSTRAINT "KanbanTask_appUserId_fkey"
FOREIGN KEY ("appUserId") REFERENCES "AppUser"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
