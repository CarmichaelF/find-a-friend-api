/*
  Warnings:

  - You are about to drop the column `address` on the `ORG` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `ORG` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `ORG` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `ORG` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `ORG` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `ORG` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ORG" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "zipcode",
ADD COLUMN     "addressId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "addressId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ORG" ADD CONSTRAINT "ORG_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
