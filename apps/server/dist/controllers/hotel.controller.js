"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHotel = exports.getHotelById = exports.getHotelBySlug = exports.getAllHotels = void 0;
const hotel_actions_1 = require("../actions/hotel.actions");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const prisma_1 = require("../db/prisma");
const shared_1 = require("@hotellier/shared");
const appError_1 = __importDefault(require("../utils/appError"));
exports.getAllHotels = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await (0, hotel_actions_1.getAllHotelsActions)({
        query: req.query.query,
        limit: req.query.limit ? Number(req.query.limit) : 10,
        page: req.query.page ? Number(req.query.page) : 1,
        rating: req.query.rating,
        sort: req.query.sort,
    });
    res.status(200).json({
        data: result,
    });
});
exports.getHotelBySlug = (0, catchAsync_1.default)(async (req, res, next) => {
    const { slug } = req.params;
    const data = await prisma_1.prisma.hotel.findFirst({
        where: { slug: slug },
    });
    res.status(200).json({
        data,
    });
});
exports.getHotelById = (0, catchAsync_1.default)(async (req, res, next) => {
    const { hotelId } = req.params;
    const data = await prisma_1.prisma.hotel.findFirst({
        where: { id: hotelId },
    });
    res.status(200).json({
        data,
    });
});
exports.createHotel = (0, catchAsync_1.default)(async (req, res, next) => {
    const data = shared_1.insertHotelSchema.parse(req.body);
    const slug = (0, shared_1.generateSlugFromName)(data.name);
    if (!req.user?.id)
        return next(new appError_1.default("Unauthorized: User not autheticated", 401));
    const hotel = await prisma_1.prisma.hotel.create({
        data: {
            ...data,
            slug,
            ownerId: req.user.id,
        },
    });
    res.status(201).json({
        status: "success",
        data: {
            hotel,
        },
    });
});
