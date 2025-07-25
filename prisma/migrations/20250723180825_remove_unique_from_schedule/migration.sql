/*
  Warnings:

  - A unique constraint covering the columns `[client_id]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organization_id]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "schedules_client_id_organization_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "schedules_client_id_key" ON "schedules"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_organization_id_key" ON "schedules"("organization_id");
