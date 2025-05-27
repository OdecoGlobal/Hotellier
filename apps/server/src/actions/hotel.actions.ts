import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma";

// Get all Hotels
export async function getAllHotelsActions({
  query,
  limit = 10,
  page,
  rating,
  sort,
}: {
  query: string;
  limit?: number;
  page: number;
  rating?: string;
  sort?: string;
}) {
  const queryFilter: Prisma.HotelWhereInput =
    query && query! == "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  const data = await prisma.hotel.findMany({
    where: { ...queryFilter },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
  });
  const dataCount = await prisma.hotel.count();

  return {
    status: "success",
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}
