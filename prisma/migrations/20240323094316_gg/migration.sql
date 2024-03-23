/*
  Warnings:

  - You are about to drop the `DecompileTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DecompileTask" DROP CONSTRAINT "DecompileTask_task_id_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "answer" TEXT,
ADD COLUMN     "file_url" TEXT;

-- DropTable
DROP TABLE "DecompileTask";
