-- CreateTable
CREATE TABLE "AppUser" (
    "id" SERIAL NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_clerkUserId_key" ON "AppUser"("clerkUserId");

-- AlterTable
ALTER TABLE "TicketUpdate"
ADD COLUMN "appUserId" INTEGER;

-- CreateIndex
CREATE INDEX "TicketUpdate_appUserId_idx" ON "TicketUpdate"("appUserId");

-- AddForeignKey
ALTER TABLE "TicketUpdate"
ADD CONSTRAINT "TicketUpdate_appUserId_fkey"
FOREIGN KEY ("appUserId") REFERENCES "AppUser"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
