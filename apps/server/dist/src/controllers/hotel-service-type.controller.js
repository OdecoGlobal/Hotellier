"use strict";
/*
import { insertHotelServicesTypeSchema } from '@hotellier/shared';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { prisma } from '../db/prisma';
import AppError from 'src/utils/appError';

export const getAllHotelServiceTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await prisma.hotelServiceType.findMany();
    res.status(200).json({
      status: 'success',
      data,
    });
  }
);
export const getAllHotelServiceTypesById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { serviceId } = req.params;
    const data = await prisma.hotelServiceType.findUnique({
      where: { id: serviceId },
    });

    if (!data) return next(new AppError('Service is not found', 400));

    res.status(200).json({
      status: 'success',
      data,
    });
  }
);

export const createHotelServiceTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = insertHotelServicesTypeSchema.parse(req.body);
    const serviceType = await prisma.hotelServiceType.create({
      data,
    });
    res.status(201).json({
      status: 'success',
      data: serviceType,
    });
  }
);

export const updateHotelServiceType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { serviceId } = req.params;
    const serviceExists = await prisma.hotelServiceType.findUnique({
      where: { id: serviceId },
    });

    if (!serviceExists) return next(new AppError('Service is not found', 400));

    const data = insertHotelServicesTypeSchema.parse(req.body);
    const updatedHotelService = await prisma.hotelServiceType.update({
      where: { id: serviceId },
      data: updateHotelServiceType,
    });

    res.status(200).json({
      status: 'success',
      data: updateHotelServiceType,
    });
  }
);

export const deletHotelServiceType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { serviceId } = req.params;
    const serviceExists = await prisma.hotelServiceType.findUnique({
      where: { id: serviceId },
    });

    if (!serviceExists) return next(new AppError('Service is not found', 400));

    await prisma.hotelServiceType.delete({
      where: { id: serviceId },
    });

    res.status(204);
  }
);*/
