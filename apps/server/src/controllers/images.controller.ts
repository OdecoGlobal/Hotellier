import multer, { FileFilterCallback } from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { prisma } from '../db/prisma';
import { generateSlugFromName } from '@hotellier/shared';

interface HotelUploadFiles {
  hotelImages?: Express.Multer.File[];
  exterior?: Express.Multer.File[];
  interior?: Express.Multer.File[];
}

interface RoomUploadFiles {
  room?: Express.Multer.File[];
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadHotelsImages = upload.fields([
  { name: 'hotelImages', maxCount: 10 },
  { name: 'exterior', maxCount: 5 },
  { name: 'interior', maxCount: 5 },
]);

export const uploadRoomImages = upload.array('rooms', 8);

const uploadImages = async (
  files: Express.Multer.File[],
  folder: string,
  prefix: string,
  targetArray: string[]
) => {
  const defaultTransformation = [
    { width: 2000, height: 1333, crop: 'fill' },
    { quality: 'auto:good' },
  ];

  await Promise.all(
    files.map(async (file, i) => {
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;
      const publicId = `${prefix}-${i + 1}`;
      try {
        const result = await cloudinary.uploader.upload(dataURI, {
          folder,
          public_id: publicId,
          transformation: defaultTransformation,
        });
        targetArray.push(result.secure_url);
      } catch (error) {
        console.error(`failed to upload ${prefix} image`, error);
      }
    })
  );
};

export const resizeAndUploadRoomImages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as RoomUploadFiles;
    if (!files.room) return next();

    const { roomId } = req.params;

    if (!roomId)
      return next(new AppError('Room id is required to upload images', 400));

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        hotel: true,
      },
    });
    if (!room) return next(new AppError('Room not found', 400));

    const hotel = await prisma.hotelBasicInfo.findUnique({
      where: { hotelId: room.hotelId },
    });

    if (!hotel) return next(new AppError('Hotel not found', 400));

    const hotelName = generateSlugFromName(hotel.name);
    const roomName = generateSlugFromName(room.name);

    const baseFolder = `hotels/${hotelName}/${roomName}`;

    const timestamp = Date.now();

    if (files.room) {
      req.body.roomImages = [];
      await uploadImages(
        files.room,
        `${baseFolder}/room`,
        `room-${timestamp}`,
        req.body.roomImages
      );
    }
  }
);

export const resizeAndUploadHotelsImages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as HotelUploadFiles;
    if (!files?.hotelImages && !files?.exterior && !files?.interior)
      return next();

    const { hotelId } = req.params;

    if (!hotelId)
      return next(new AppError('Hotel id is required to upload images', 400));

    const hotel = await prisma.hotelBasicInfo.findUnique({
      where: { hotelId },
    });
    if (!hotel) return next(new AppError('Hotel not found', 400));

    const hotelName = generateSlugFromName(hotel.name);

    const baseFolder = `hotels/${hotelName}/${hotelId}`;
    const defaultTransformation = [
      { width: 2000, height: 1333, crop: 'fill' },
      { quality: 'auto:good' },
    ];

    const timestamp = Date.now();

    if (files.hotelImages) {
      req.body.hotelImages = [];

      await uploadImages(
        files.hotelImages,
        `${baseFolder}/hotelImages`,
        `hotelImages-${timestamp}`,
        req.body.hotelImages
      );
    }

    if (files.exterior) {
      req.body.exterior = [];

      await uploadImages(
        files.exterior,
        `${baseFolder}/exterior`,
        `exterior-${timestamp}`,
        req.body.exterior
      );
    }
    if (files.interior) {
      req.body.interior = [];
      await uploadImages(
        files.interior,
        `${baseFolder}/interior`,
        `interior-${timestamp}`,
        req.body.interior
      );
    }
  }
);
