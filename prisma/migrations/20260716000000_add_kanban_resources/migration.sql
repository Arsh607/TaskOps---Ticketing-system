-- CreateEnum
CREATE TYPE "KanbanPriority" AS ENUM ('High', 'Medium', 'Low');

-- CreateTable
CREATE TABLE "KanbanColumn" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "KanbanColumn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KanbanTask" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "priority" "KanbanPriority" NOT NULL,
    "columnId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KanbanTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KanbanColumn_title_key" ON "KanbanColumn"("title");

-- CreateIndex
CREATE INDEX "KanbanTask_columnId_idx" ON "KanbanTask"("columnId");

-- AddForeignKey
ALTER TABLE "KanbanTask" ADD CONSTRAINT "KanbanTask_columnId_fkey"
FOREIGN KEY ("columnId") REFERENCES "KanbanColumn"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- SeedData
INSERT INTO "KanbanColumn" ("id", "title", "description") VALUES
    (1, 'To Do', 'Tasks that are ready to start.'),
    (2, 'In Progress', 'Tasks currently being worked on.'),
    (3, 'Review', 'Tasks waiting for review or QA.'),
    (4, 'Done', 'Tasks that have been completed.');

INSERT INTO "KanbanTask" ("id", "title", "priority", "columnId") VALUES
    (1, 'Create ticket intake form validation', 'High', 1),
    (2, 'Add assignee filter to Kanban board', 'Medium', 1),
    (3, 'Draft priority labels for support tickets', 'Low', 1),
    (4, 'Build drag and drop task movement', 'High', 2),
    (5, 'Connect ticket list to task repository', 'Medium', 2),
    (6, 'Review empty-state copy for Kanban columns', 'Low', 3),
    (7, 'QA edit flow for existing tickets', 'High', 3),
    (8, 'Verify completed tickets remain archived', 'Medium', 4),
    (9, 'Close resolved onboarding support ticket', 'Low', 4),
    (10, 'Confirm task count badges update by column', 'Medium', 4);

SELECT setval(
    pg_get_serial_sequence('"KanbanTask"', 'id'),
    (SELECT MAX("id") FROM "KanbanTask")
);
