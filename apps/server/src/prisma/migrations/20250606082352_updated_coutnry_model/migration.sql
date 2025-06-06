/*
  Warnings:

  - The primary key for the `City` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `admin_name` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `capital` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `city_ascii` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `iso2` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `iso3` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `population` on the `City` table. All the data in the column will be lost.
  - The `id` column on the `City` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `name` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" DROP CONSTRAINT "City_pkey",
DROP COLUMN "admin_name",
DROP COLUMN "capital",
DROP COLUMN "city",
DROP COLUMN "city_ascii",
DROP COLUMN "country",
DROP COLUMN "iso2",
DROP COLUMN "iso3",
DROP COLUMN "lat",
DROP COLUMN "lng",
DROP COLUMN "population",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "stateId" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "City_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Country" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "iso2" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "phoneCode" TEXT,
    "capital" TEXT,
    "currency" TEXT,
    "currencyName" TEXT,
    "region" TEXT,
    "nationality" TEXT,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "stateCode" TEXT,
    "countryId" UUID NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "country_name_idx" ON "Country"("name");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
