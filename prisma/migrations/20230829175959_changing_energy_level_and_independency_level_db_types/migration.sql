/*
  Warnings:

  - Changed the type of `energyLevel` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independencyLevel` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "energyLevel",
ADD COLUMN     "energyLevel" INTEGER NOT NULL,
DROP COLUMN "independencyLevel",
ADD COLUMN     "independencyLevel" INTEGER NOT NULL;
