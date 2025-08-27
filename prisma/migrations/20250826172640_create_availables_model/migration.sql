-- CreateTable
CREATE TABLE "public"."availables" (
    "id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    "start_time_in_minutes" INTEGER NOT NULL,
    "end_time_in_minutes" INTEGER NOT NULL,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "availables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "availables_organization_id_idx" ON "public"."availables"("organization_id");

-- AddForeignKey
ALTER TABLE "public"."availables" ADD CONSTRAINT "availables_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
