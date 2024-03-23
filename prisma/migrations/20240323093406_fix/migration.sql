/*
  Warnings:

  - You are about to drop the column `image_id` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "image_id",
ADD COLUMN     "image_url" TEXT;
