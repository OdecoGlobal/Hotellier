"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeAndUploadHotelsImages = exports.resizeAndUploadRoomImages = exports.uploadRoomImages = exports.uploadHotelsImages = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const prisma_1 = require("../db/prisma");
const shared_1 = require("@hotellier/shared");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
const multerStorage = multer_1.default.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
});
exports.uploadHotelsImages = upload.fields([
    { name: 'hotelImages', maxCount: 10 },
    { name: 'exterior', maxCount: 5 },
    { name: 'interior', maxCount: 5 },
]);
exports.uploadRoomImages = upload.array('rooms', 8);
const uploadImages = async (files, folder, prefix, targetArray) => {
    const defaultTransformation = [
        { width: 2000, height: 1333, crop: 'fill' },
        { quality: 'auto:good' },
    ];
    await Promise.all(files.map(async (file, i) => {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = `data:${file.mimetype};base64,${b64}`;
        const publicId = `${prefix}-${i + 1}`;
        try {
            const result = await cloudinary_1.v2.uploader.upload(dataURI, {
                folder,
                public_id: publicId,
                transformation: defaultTransformation,
            });
            targetArray.push(result.secure_url);
        }
        catch (error) {
            console.error(`failed to upload ${prefix} image`, error);
        }
    }));
};
exports.resizeAndUploadRoomImages = (0, catchAsync_1.default)(async (req, res, next) => {
    const files = req.files;
    if (!files.room)
        return next();
    const { roomId } = req.params;
    if (!roomId)
        return next(new appError_1.default('Room id is required to upload images', 400));
    const room = await prisma_1.prisma.room.findUnique({
        where: { id: roomId },
        include: {
            hotel: true,
        },
    });
    if (!room)
        return next(new appError_1.default('Room not found', 400));
    const hotel = await prisma_1.prisma.hotelBasicInfo.findUnique({
        where: { hotelId: room.hotelId },
    });
    if (!hotel)
        return next(new appError_1.default('Hotel not found', 400));
    const hotelName = (0, shared_1.generateSlugFromName)(hotel.name);
    const roomName = (0, shared_1.generateSlugFromName)(room.name);
    const baseFolder = `hotels/${hotelName}/${roomName}`;
    const timestamp = Date.now();
    if (files.room) {
        req.body.roomImages = [];
        await uploadImages(files.room, `${baseFolder}/room`, `room-${timestamp}`, req.body.roomImages);
    }
});
exports.resizeAndUploadHotelsImages = (0, catchAsync_1.default)(async (req, res, next) => {
    const files = req.files;
    if (!files?.hotelImages && !files?.exterior && !files?.interior)
        return next();
    const { hotelId } = req.params;
    if (!hotelId)
        return next(new appError_1.default('Hotel id is required to upload images', 400));
    const hotel = await prisma_1.prisma.hotelBasicInfo.findUnique({
        where: { hotelId },
    });
    if (!hotel)
        return next(new appError_1.default('Hotel not found', 400));
    const hotelName = (0, shared_1.generateSlugFromName)(hotel.name);
    const baseFolder = `hotels/${hotelName}/${hotelId}`;
    const defaultTransformation = [
        { width: 2000, height: 1333, crop: 'fill' },
        { quality: 'auto:good' },
    ];
    const timestamp = Date.now();
    if (files.hotelImages) {
        req.body.hotelImages = [];
        await uploadImages(files.hotelImages, `${baseFolder}/hotelImages`, `hotelImages-${timestamp}`, req.body.hotelImages);
    }
    if (files.exterior) {
        req.body.exterior = [];
        await uploadImages(files.exterior, `${baseFolder}/exterior`, `exterior-${timestamp}`, req.body.exterior);
    }
    if (files.interior) {
        req.body.interior = [];
        await uploadImages(files.interior, `${baseFolder}/interior`, `interior-${timestamp}`, req.body.interior);
    }
});
