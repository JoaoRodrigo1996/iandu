/*
  Warnings:

  - A unique constraint covering the columns `[client_id,organization_id]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "schedules_client_id_organization_id_idx";

-- CreateIndex
CREATE UNIQUE INDEX "schedules_client_id_organization_id_key" ON "schedules"("client_id", "organization_id");
