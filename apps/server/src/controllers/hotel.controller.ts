import { NextFunction, Request, Response } from 'express';
import { getAllHotelsActions } from '../actions/hotel.actions';
import catchAsync from '../utils/catchAsync';
import { prisma } from '../db/prisma';
import {
  generateSlugFromName,
  insertHotelSchema,
  updateHotelSchema,
} from '@hotellier/shared';
import AppError from '../utils/appError';
import { AuthenticatedRequest } from '../types/express/custom';

export const getAllHotels = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await getAllHotelsActions({
      query: req.query.query as string,
      limit: req.query.limit ? Number(req.query.limit) : 10,
      page: req.query.page ? Number(req.query.page) : 1,
      rating: req.query.rating as string,
      sort: req.query.sort as string,
    });
    res.status(200).json({
      data: result,
    });
  }
);

export const getHotelBySlug = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const data = await prisma.hotel.findFirst({
      where: { slug: slug },
    });
    res.status(200).json({
      data,
    });
  }
);

export const getHotelById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hotelId } = req.params;
    const data = await prisma.hotel.findFirst({
      where: { id: hotelId },
    });
    res.status(200).json({
      data,
    });
  }
);

export const createHotel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = insertHotelSchema.parse(req.body);

    const slug = generateSlugFromName(data.name);
    const authReq = req as AuthenticatedRequest;

    const hotel = await prisma.hotel.create({
      data: {
        ...data,
        slug,
        ownerId: authReq.user.id,
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        hotel,
      },
    });
  }
);

export const updateHotel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hotelId } = req.params;

    const authReq = req as AuthenticatedRequest;
    const hotelExist = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotelExist) return next(new AppError('Hotel not found', 400));

    if (
      authReq.user.role !== 'ADMIN' &&
      hotelExist.ownerId !== authReq.user.id
    ) {
      return next(
        new AppError('You do not have permission to update this hotel', 403)
      );
    }

    const hotel = updateHotelSchema.parse(req.body);

    if (hotel.name) {
      hotel.slug = generateSlugFromName(hotel.name);
    }

    const updatedHotel = await prisma.hotel.update({
      where: { id: hotelId },
      data: hotel,
    });

    res.status(200).json({
      status: 'success',
      data: updatedHotel,
    });
  }
);

export const deleteHotel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;

    const { hotelId } = req.params;

    const hotelExist = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotelExist) return next(new AppError('Hotel not found', 400));

    if (
      hotelExist.ownerId !== authReq.user.id &&
      authReq.user.role !== 'ADMIN'
    ) {
      return next(
        new AppError('You do not have permission to update this hotel', 403)
      );
    }

    await prisma.hotel.delete({
      where: { id: hotelId },
    });

    res.status(204).json({
      status: 'Success',
      data: null,
    });
  }
);
