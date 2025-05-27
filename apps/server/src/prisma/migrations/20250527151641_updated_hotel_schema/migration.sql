/*
  Warnings:

  - Added the required column `locationBrief` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "locationBrief" TEXT NOT NULL,
ADD COLUMN     "services" TEXT[] DEFAULT ARRAY[]::TEXT[];
