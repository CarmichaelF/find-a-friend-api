/*
  Warnings:

  - Added the required column `age` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dogSize` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energyLevel` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environment` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indenpendencyLevel` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "dogSize" TEXT NOT NULL,
ADD COLUMN     "energyLevel" TEXT NOT NULL,
ADD COLUMN     "environment" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "indenpendencyLevel" TEXT NOT NULL;
