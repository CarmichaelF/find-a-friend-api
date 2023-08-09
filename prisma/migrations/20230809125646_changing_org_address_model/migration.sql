/*
  Warnings:

  - You are about to drop the column `addressId` on the `ORG` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `ORG` table. All the data in the column will be lost.
  - You are about to drop the `OrgAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `ORG` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `ORG` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `ORG` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `ORG` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `ORG` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ORG" DROP CONSTRAINT "ORG_addressId_fkey";

-- AlterTable
ALTER TABLE "ORG" DROP COLUMN "addressId",
DROP COLUMN "postalCode",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL;

-- DropTable
DROP TABLE "OrgAddress";
