/*
  Warnings:

  - You are about to drop the column `city` on the `ongs` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `ongs` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `ongs` table. All the data in the column will be lost.
  - You are about to drop the column `street_number` on the `ongs` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `ongs` table. All the data in the column will be lost.
  - Added the required column `address_id` to the `ongs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ongs" DROP COLUMN "city",
DROP COLUMN "state",
DROP COLUMN "street",
DROP COLUMN "street_number",
DROP COLUMN "zipcode",
ADD COLUMN     "address_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "street_number" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ongs" ADD CONSTRAINT "ongs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
