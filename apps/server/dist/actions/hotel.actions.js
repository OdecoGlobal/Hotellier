"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHotelsActions = getAllHotelsActions;
const prisma_1 = require("../db/prisma");
// Get all Hotels
async function getAllHotelsActions({ query, limit = 10, page, rating, sort, }) {
    const queryFilter = query && query == "all"
        ? {
            name: {
                contains: query,
                mode: "insensitive",
            },
        }
        : {};
    const data = await prisma_1.prisma.hotel.findMany({
        where: { ...queryFilter },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
    });
    const dataCount = await prisma_1.prisma.hotel.count();
    return {
        status: "success",
        data,
        totalPages: Math.ceil(dataCount / limit),
    };
}
