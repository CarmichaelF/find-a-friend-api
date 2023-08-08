-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT[],

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);
