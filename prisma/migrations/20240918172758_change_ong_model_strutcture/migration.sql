/*
  Warnings:

  - Added the required column `state` to the `ongs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `ongs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_number` to the `ongs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `ongs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ongs" ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "street_number" TEXT NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL;
