/*
  Warnings:

  - A unique constraint covering the columns `[cityId]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iso2]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stateId]` on the table `State` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[countryCode]` on the table `State` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cityId` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateUqId` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "cityId" INTEGER NOT NULL,
ADD COLUMN     "countryName" TEXT,
ADD COLUMN     "stateCode" TEXT,
ADD COLUMN     "stateName" TEXT,
ADD COLUMN     "stateUqId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "countryCode" TEXT,
ADD COLUMN     "countryName" TEXT,
ADD COLUMN     "stateId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "city_id_idx" ON "City"("cityId");

-- CreateIndex
CREATE UNIQUE INDEX "country_iso2_idx" ON "Country"("iso2");

-- CreateIndex
CREATE UNIQUE INDEX "state_id_idx" ON "State"("stateId");

-- CreateIndex
CREATE UNIQUE INDEX "country_code_idx" ON "State"("countryCode");
