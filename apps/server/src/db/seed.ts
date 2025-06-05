/*
import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  console.log("Started seeding data");

  const prisma = new PrismaClient();

  await prisma.room.deleteMany();
  await prisma.roomCategory.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.user.deleteMany();

  const users = await Promise.all(
    sampleData.users.map((user) => prisma.user.create({ data: user }))
  );

  const owners = users.filter((user) => user.role === "OWNER");

  const hotels = await Promise.all(
    sampleData.hotels.map((hotel, index) => {
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
    })
  );

  const hotelSlugToId = hotels.reduce((acc, hotel) => {
    acc[hotel.slug] = hotel.id;
    return acc;
  }, {} as Record<string, string>);

  const roomCategories = await Promise.all(
    sampleData.roomCategories.map((category) => {
      return prisma.roomCategory.create({
        data: {
          name: category.name,
          description: category.description,
          hotel: {
            connect: { id: hotelSlugToId[category.hotelSlug] },
          },
        },
      });
    })
  );

  const categoryNameToId = roomCategories.reduce((acc, category) => {
    acc[category.name] = category.id;
    return acc;
  }, {} as Record<string, string>);

  await Promise.all(
    sampleData.rooms.map((room) => {
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
    })
  );

  console.log("Seeding completed successfully");
}

main().catch((e) => {
  console.error("Seeding error:", e);
  process.exit(1);
});
*/
