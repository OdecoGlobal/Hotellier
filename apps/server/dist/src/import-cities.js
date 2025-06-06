"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson_1 = __importDefault(require("csvtojson"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("./db/prisma");
async function importCities() {
    const filePath = path_1.default.join(__dirname, 'worldcities.csv');
    const cities = await (0, csvtojson_1.default)().fromFile(filePath);
    console.log(`Importing ${cities.length} cities`);
    for (const city of cities) {
        try {
            await prisma_1.prisma.city.create({
                data: {
                    id: Number(city.id),
                    city: city.city,
                    city_ascii: city.city_ascii,
                    lat: parseFloat(city.lat),
                    lng: parseFloat(city.lng),
                    country: city.country,
                    iso2: city.iso2,
                    iso3: city.iso3,
                    admin_name: city.admin_name || null,
                    capital: city.capital || null,
                    population: city.population ? parseInt(city.population) : null,
                },
            });
        }
        catch (err) {
            console.error(`Error importing cities:`, err);
        }
    }
    console.log('Import complete');
    await prisma_1.prisma.$disconnect();
}
importCities();
