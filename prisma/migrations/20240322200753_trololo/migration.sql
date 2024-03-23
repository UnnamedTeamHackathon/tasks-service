-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('reverse', 'cryptography', 'steganoraphy', 'web', 'forensic');

-- CreateEnum
CREATE TYPE "TaskDifficulty" AS ENUM ('easy', 'normal', 'hard', 'very_hard');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "TaskDifficulty" NOT NULL DEFAULT 'normal',
    "points" INTEGER NOT NULL DEFAULT 100,
    "type" "TaskType" NOT NULL DEFAULT 'reverse',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecompileTask" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "file_url" TEXT NOT NULL,
    "task_id" UUID NOT NULL,

    CONSTRAINT "DecompileTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecompileTaskAnswer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "answer" TEXT NOT NULL,
    "decompile_task_id" UUID NOT NULL,

    CONSTRAINT "DecompileTaskAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TaskToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE INDEX "Task_id_idx" ON "Task"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DecompileTask_task_id_key" ON "DecompileTask"("task_id");

-- CreateIndex
CREATE UNIQUE INDEX "_TaskToUser_AB_unique" ON "_TaskToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskToUser_B_index" ON "_TaskToUser"("B");

-- AddForeignKey
ALTER TABLE "DecompileTask" ADD CONSTRAINT "DecompileTask_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecompileTaskAnswer" ADD CONSTRAINT "DecompileTaskAnswer_decompile_task_id_fkey" FOREIGN KEY ("decompile_task_id") REFERENCES "DecompileTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD CONSTRAINT "_TaskToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD CONSTRAINT "_TaskToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
