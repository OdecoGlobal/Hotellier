/*
  Warnings:

  - You are about to drop the column `images` on the `hotel_basic_info` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('COVER', 'EXTERIOR', 'INTERIOR');

-- AlterTable
ALTER TABLE "hotel_basic_info" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "images" DROP DEFAULT;

-- CreateTable
CREATE TABLE "hotel_images" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hotelId" UUID NOT NULL,
    "imageType" "ImageType" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "hotel_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_images" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roomId" UUID NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "room_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "city_ascii" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "iso2" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "admin_name" TEXT,
    "capital" TEXT,
    "population" INTEGER,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hotel_images" ADD CONSTRAINT "hotel_images_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_images" ADD CONSTRAINT "room_images_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
