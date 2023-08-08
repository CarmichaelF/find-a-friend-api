/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ORG" DROP CONSTRAINT "ORG_addressId_fkey";

-- DropTable
DROP TABLE "Address";

-- CreateTable
CREATE TABLE "OrgAddress" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "OrgAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ORG" ADD CONSTRAINT "ORG_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "OrgAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
