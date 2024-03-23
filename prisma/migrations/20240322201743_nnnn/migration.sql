/*
  Warnings:

  - You are about to drop the `DecompileTaskAnswer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `DecompileTask` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DecompileTaskAnswer" DROP CONSTRAINT "DecompileTaskAnswer_decompile_task_id_fkey";

-- AlterTable
ALTER TABLE "DecompileTask" ADD COLUMN     "answer" TEXT NOT NULL;

-- DropTable
DROP TABLE "DecompileTaskAnswer";
