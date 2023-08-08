/*
  Warnings:

  - You are about to drop the column `requirements` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "requirements";

-- CreateTable
CREATE TABLE "PetRequirement" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "petId" TEXT,

    CONSTRAINT "PetRequirement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetRequirement" ADD CONSTRAINT "PetRequirement_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
