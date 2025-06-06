"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelRoom = exports.addRoomImages = exports.addRoom = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const prisma_1 = require("../db/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const shared_1 = require("@hotellier/shared");
const hotel_controller_1 = require("./hotel.controller");
exports.addRoom = (0, catchAsync_1.default)(async (req, res, next) => {
    const { hotelId } = req.params;
    const roomData = shared_1.addRoomSchema.parse(req.body);
    const room = await prisma_1.prisma.room.create({
        data: {
            hotelId,
            ...roomData,
            isCompleted: true,
        },
    });
    const completedRooms = await prisma_1.prisma.room.count({
        where: { hotelId, isCompleted: true },
    });
    await (0, hotel_controller_1.updateHotelProgress)(hotelId, 'step4_rooms', completedRooms > 0);
    res.status(201).json({
        status: 'success',
        data: room,
    });
});
exports.addRoomImages = (0, catchAsync_1.default)(async (req, res, next) => {
    const { roomId } = req.params;
    const { roomImages } = req.body;
    const roomExists = await prisma_1.prisma.room.findUnique({
        where: { id: roomId },
    });
    if (!roomExists) {
        return next(new appError_1.default('Room not found', 404));
    }
    const imageData = [];
    if (roomImages && roomImages.length > 0) {
        imageData.push(...roomImages.map((url) => ({
            roomId,
            imageUrl: url,
        })));
    }
    const createdRoomImages = await prisma_1.prisma.roomImages.createMany({
        data: imageData,
    });
    res.status(201).json({
        status: 'success',
        data: {
            roomImages: createdRoomImages,
        },
    });
});
exports.getHotelRoom = (0, catchAsync_1.default)(async (req, res, next) => {
    const { hotelId } = req.params;
    const rooms = await prisma_1.prisma.room.findMany({
        where: { hotelId },
        include: { amenities: true },
    });
    res.status(200).json({
        status: 'success',
        data: rooms,
    });
});
