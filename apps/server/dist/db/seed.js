"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const sample_data_1 = __importDefault(require("./sample-data"));
async function main() {
    console.log("Started seeding data");
    const prisma = new client_1.PrismaClient();
    await prisma.room.deleteMany();
    await prisma.roomCategory.deleteMany();
    await prisma.hotel.deleteMany();
    await prisma.user.deleteMany();
    const users = await Promise.all(sample_data_1.default.users.map((user) => prisma.user.create({ data: user })));
    const owners = users.filter((user) => user.role === "OWNER");
    const hotels = await Promise.all(sample_data_1.default.hotels.map((hotel, index) => {
        // Cycle through owners if there are more hotels than owners
        const owner = owners[index % owners.length];
        return prisma.hotel.create({
            data: {
                ...hotel,
                owner: {
                    connect: { id: owner.id },
                },
            },
        });
    }));
    const hotelSlugToId = hotels.reduce((acc, hotel) => {
        acc[hotel.slug] = hotel.id;
        return acc;
    }, {});
    const roomCategories = await Promise.all(sample_data_1.default.roomCategories.map((category) => {
        return prisma.roomCategory.create({
            data: {
                name: category.name,
                description: category.description,
                hotel: {
                    connect: { id: hotelSlugToId[category.hotelSlug] },
                },
            },
        });
    }));
    const categoryNameToId = roomCategories.reduce((acc, category) => {
        acc[category.name] = category.id;
        return acc;
    }, {});
    await Promise.all(sample_data_1.default.rooms.map((room) => {
        return prisma.room.create({
            data: {
                roomNumber: room.roomNumber,
                price: room.price,
                available: room.available,
                category: {
                    connect: { id: categoryNameToId[room.categoryName] },
                },
            },
        });
    }));
    console.log("Seeding completed successfully");
}
main().catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
});
