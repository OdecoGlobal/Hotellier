import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import { prisma } from '../db/prisma';
import AppError from '../utils/appError';
import { addRoomSchema } from '@hotellier/shared';
import { updateHotelProgress } from './hotel.controller';

export const addRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hotelId } = req.params;
    const roomData = addRoomSchema.parse(req.body);

    const room = await prisma.room.create({
      data: {
        hotelId,
        ...roomData,
        isCompleted: true,
      },
    });

    const completedRooms = await prisma.room.count({
      where: { hotelId, isCompleted: true },
    });

    await updateHotelProgress(hotelId, 'step4_rooms', completedRooms > 0);

    res.status(201).json({
      status: 'success',
      data: room,
    });
  }
);

export const addRoomImages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const { roomImages } = req.body;

    const roomExists = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!roomExists) {
      return next(new AppError('Room not found', 404));
    }

    const imageData = [];

    if (roomImages && roomImages.length > 0) {
      imageData.push(
        ...roomImages.map((url: string) => ({
          roomId,
          imageUrl: url,
        }))
      );
    }

    const createdRoomImages = await prisma.roomImages.createMany({
      data: imageData,
    });

    res.status(201).json({
      status: 'success',
      data: {
        roomImages: createdRoomImages,
      },
    });
  }
);

export const getHotelRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hotelId } = req.params;
    const rooms = await prisma.room.findMany({
      where: { hotelId },
      include: { amenities: true },
    });
    res.status(200).json({
      status: 'success',
      data: rooms,
    });
  }
);
