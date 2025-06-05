-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'OWNER', 'ADMIN');

-- CreateEnum
CREATE TYPE "HotelStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "HotelCategory" AS ENUM ('BUDGET', 'BUSINESS', 'LUXURY', 'RESORT', 'BOUTIQUE', 'EXTENDED_STAY');

-- CreateEnum
CREATE TYPE "CancellationPolicy" AS ENUM ('FREE_CANCELLATION', 'MODERATE', 'STRICT', 'SUPER_STRICT');

-- CreateEnum
CREATE TYPE "PetPolicy" AS ENUM ('NOT_ALLOWED', 'ALLOWED_WITH_FEE', 'ALLOWED_FREE');

-- CreateEnum
CREATE TYPE "SmokingPolicy" AS ENUM ('NO_SMOKING', 'SMOKING_ALLOWED', 'DESIGNATED_AREAS');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'CASH', 'BANK_TRANSFER', 'DIGITAL_WALLET');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('STANDARD', 'DELUXE', 'SUITE', 'FAMILY', 'EXECUTIVE', 'PRESIDENTIAL');

-- CreateEnum
CREATE TYPE "RateType" AS ENUM ('STANDARD', 'WEEKEND', 'SEASONAL', 'PROMOTIONAL', 'CORPORATE', 'GROUP');

-- CreateEnum
CREATE TYPE "AmenityType" AS ENUM ('DINING', 'RECREATION', 'BUSINESS', 'WELLNESS', 'TRANSPORTATION', 'CONNECTIVITY', 'SERVICES');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userName" TEXT NOT NULL DEFAULT 'NO_NAME',
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(6),
    "image" TEXT,
    "password" TEXT,
    "passwordChangedAt" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "address" JSON,
    "paymentMethod" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotels" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "status" "HotelStatus" NOT NULL DEFAULT 'DRAFT',
    "completionSteps" JSONB NOT NULL DEFAULT '{}',
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "totalSteps" INTEGER NOT NULL DEFAULT 6,
    "isFullyCompleted" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" UUID NOT NULL,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_basic_info" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hotelId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "hotel_basic_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_policies" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hotelId" UUID NOT NULL,
    "checkInTime" TEXT NOT NULL,
    "checkOutTime" TEXT NOT NULL,
    "lateCheckInFee" DOUBLE PRECISION,
    "earlyCheckOutFee" DOUBLE PRECISION,
    "cancellationPolicy" "CancellationPolicy" NOT NULL,
    "cancellationHours" INTEGER NOT NULL,
    "cancellationFee" DOUBLE PRECISION,
    "childPolicy" TEXT,
    "petPolicy" "PetPolicy" NOT NULL DEFAULT 'NOT_ALLOWED',
    "petFee" DOUBLE PRECISION,
    "smokingPolicy" "SmokingPolicy" NOT NULL DEFAULT 'NO_SMOKING',
    "paymentMethods" "PaymentMethod"[],
    "depositRequired" BOOLEAN NOT NULL DEFAULT false,
    "depsoitAmount" DOUBLE PRECISION,
    "additionalPolicy" JSONB NOT NULL DEFAULT '{}',
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "hotel_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hotelId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "roomType" "RoomType" NOT NULL,
    "size" DOUBLE PRECISION,
    "maxOccupancy" INTEGER NOT NULL,
    "bedConfigurations" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "totalRooms" INTEGER NOT NULL DEFAULT 1,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "basePrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_rates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hotelId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rateType" "RateType" NOT NULL,
    "baseRate" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validTo" TIMESTAMP(3) NOT NULL,
    "minimumStay" INTEGER,
    "maximumStay" INTEGER,
    "advanceBooking" INTEGER,
    "discountPercent" DOUBLE PRECISION DEFAULT 0,
    "markupPercent" DOUBLE PRECISION DEFAULT 0,
    "applicableDays" INTEGER NOT NULL DEFAULT 127,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "hotel_rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_amenities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hotelId" UUID NOT NULL,
    "amenityType" "AmenityType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isChargeable" BOOLEAN NOT NULL DEFAULT false,
    "charge" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "hotel_amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_amenities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roomId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "room_amenities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_basic_info_hotelId_key" ON "hotel_basic_info"("hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_name_idx" ON "hotel_basic_info"("name");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_slug_idx" ON "hotel_basic_info"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_policies_hotelId_key" ON "hotel_policies"("hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "room_name_idx" ON "rooms"("name");

-- AddForeignKey
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_basic_info" ADD CONSTRAINT "hotel_basic_info_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_policies" ADD CONSTRAINT "hotel_policies_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_rates" ADD CONSTRAINT "hotel_rates_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_amenities" ADD CONSTRAINT "hotel_amenities_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_amenities" ADD CONSTRAINT "room_amenities_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
