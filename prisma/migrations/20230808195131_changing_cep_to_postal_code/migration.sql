/*
  Warnings:

  - You are about to drop the column `cep` on the `ORG` table. All the data in the column will be lost.
  - Added the required column `postalCode` to the `ORG` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ORG" DROP COLUMN "cep",
ADD COLUMN     "postalCode" TEXT NOT NULL;
