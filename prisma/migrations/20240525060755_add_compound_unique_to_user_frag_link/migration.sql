/*
  Warnings:

  - A unique constraint covering the columns `[userId,fragId]` on the table `UserFragLink` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserFragLink_userId_fragId_key" ON "UserFragLink"("userId", "fragId");
