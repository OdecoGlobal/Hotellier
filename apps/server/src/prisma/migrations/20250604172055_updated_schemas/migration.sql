/*
  Warnings:

  - You are about to drop the column `depositRequired` on the `hotel_policies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "hotel_amenities" DROP CONSTRAINT "hotel_amenities_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "hotel_basic_info" DROP CONSTRAINT "hotel_basic_info_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "hotel_policies" DROP CONSTRAINT "hotel_policies_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "hotel_rates" DROP CONSTRAINT "hotel_rates_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_hotelId_fkey";

-- AlterTable
ALTER TABLE "hotel_policies" DROP COLUMN "depositRequired",
ADD COLUMN     "isDepositRequired" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "hotel_basic_info" ADD CONSTRAINT "hotel_basic_info_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_policies" ADD CONSTRAINT "hotel_policies_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_rates" ADD CONSTRAINT "hotel_rates_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_amenities" ADD CONSTRAINT "hotel_amenities_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
