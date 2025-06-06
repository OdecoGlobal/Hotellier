/*
  Warnings:

  - You are about to drop the column `latitude` on the `hotel_basic_info` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `hotel_basic_info` table. All the data in the column will be lost.
  - Added the required column `hotelType` to the `hotel_basic_info` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('NGN', 'USD', 'EUR', 'GBP');

-- CreateEnum
CREATE TYPE "HotelType" AS ENUM ('HOTEL', 'MOTEL', 'GUESTHOUSE', 'INN', 'APARTMENT');

-- AlterTable
ALTER TABLE "hotel_basic_info" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "acceptedCurrency" "Currency" NOT NULL DEFAULT 'NGN',
ADD COLUMN     "hotelType" "HotelType" NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "lng" DOUBLE PRECISION,
ADD COLUMN     "roomUnitTotal" INTEGER NOT NULL DEFAULT 0;
