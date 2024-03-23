-- CreateTable
CREATE TABLE "Hint" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "text" TEXT NOT NULL,
    "file_url" TEXT,
    "image_url" TEXT,
    "task_id" UUID NOT NULL,

    CONSTRAINT "Hint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hint_task_id_key" ON "Hint"("task_id");

-- AddForeignKey
ALTER TABLE "Hint" ADD CONSTRAINT "Hint_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
