/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Frag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Frag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Frag" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Frag_name_key" ON "Frag"("name");
