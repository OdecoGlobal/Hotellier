import { NextFunction, Request, Response } from "express";
import { getAllHotelsActions } from "../actions/hotel.actions";
import catchAsync from "../utils/catchAsync";
import { prisma } from "../db/prisma";
import { generateSlugFromName, insertHotelSchema } from "@hotellier/shared";
import AppError from "../utils/appError";

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

    if (!req.user?.id)
      return next(new AppError("Unauthorized: User not autheticated", 401));

    const hotel = await prisma.hotel.create({
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
  }
);
