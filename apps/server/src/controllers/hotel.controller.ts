import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { prisma } from '../db/prisma';
import {
  addRoomSchema,
  generateSlugFromName,
  hotelBasicInfoSchema,
  hotelPolicySchema,
} from '@hotellier/shared';
import AppError from '../utils/appError';
import { AuthenticatedRequest } from '../types/express/custom';

type StepKey =
  | 'step1_basic_info'
  | 'step2_policies'
  | 'step3_hotel_images'
  | 'step4_rooms'
  | 'step5_rates'
  | ' step6_amenities';

export async function updateHotelProgress(
  hotelId: string,
  stepKey: StepKey,
  isCompleted: boolean
) {
  const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });

  if (!hotel) throw new Error('Hotel not found');

  const completionSteps = hotel.completionSteps as Record<string, boolean>;

  completionSteps[stepKey] = isCompleted;

  const completedCount = Object.values(completionSteps).filter(Boolean).length;
  const currentStep = calculateCurrentStep(completionSteps);
  const isFullyCompleted = completedCount === 8;

  let status = hotel.status;
  if (isFullyCompleted && status === 'DRAFT') {
    status = 'PENDING_REVIEW';
  } else if (completedCount > 0 && status === 'DRAFT') {
    status = 'IN_PROGRESS';
  }

  await prisma.hotel.update({
    where: { id: hotelId },
    data: {
      completionSteps,
      currentStep,
      isFullyCompleted,
      status,
    },
  });
}

function calculateCurrentStep(
  completionSteps: Record<string, boolean>
): number {
  const steps = [
    'step1_basic_info',
    'step2_policies',
    'step3_hotel_images',
    'step4_rooms',
    'step5_rates',
    'step6_amenities',
    // 'step7_contract',
  ];

  for (let i = 0; i < steps.length; i++) {
    if (!completionSteps[steps[i]]) {
      return i + 1;
    }
  }
  return 6;
}

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

export const createHotel = catchAsync(async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;

  const basicInfoData = hotelBasicInfoSchema.parse(req.body);
  const slug = generateSlugFromName(basicInfoData.name);

  const result = await prisma.$transaction(async tx => {
    const hotel = await tx.hotel.create({
      data: {
        ownerId: authReq.user.id,
        status: 'IN_PROGRESS',
        completionSteps: {
          step1_basic_info: true,
          step2_policies: false,
          step3_hotel_images: false,
          step4_rooms: false,
          step5_rates: false,
          step6_amenities: false,
        },
        currentStep: 2,
        totalSteps: 6,
      },
    });

    const basicInfo = await tx.hotelBasicInfo.create({
      data: {
        ...basicInfoData,
        hotelId: hotel.id,
        slug: slug,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    return { hotel, basicInfo };
  });

  res.status(201).json({
    status: 'success',
    data: {
      hotel: result.hotel,
      basicInfoData: result.basicInfo,
    },
  });
});

export const updateHotelBasicInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = hotelBasicInfoSchema.partial().parse(req.body);

    if (data.name) {
      const slug = generateSlugFromName(data.name);
    }
    const { hotelId } = req.params;

    const basicInfo = await prisma.hotelBasicInfo.update({
      where: { hotelId },
      data: {
        ...data,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    await updateHotelProgress(
      hotelId,
      'step1_basic_info',
      basicInfo.isCompleted
    );

    res.status(200).json({
      status: 'success',
      data: basicInfo,
    });
  }
);

export const updatePolicies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hotelId } = req.params;
    const policiesData = hotelPolicySchema.parse(req.body);
    const policies = await prisma.hotelPolicy.upsert({
      where: { hotelId },
      update: {
        ...policiesData,
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        hotelId,
        ...policiesData,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    await updateHotelProgress(hotelId, 'step2_policies', policies.isCompleted);

    res.status(200).json({
      status: 'success',
      data: policies,
    });
  }
);
export const addHotelImages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hotelId } = req.params;
    const { hotelImages, exterior, interior } = req.body;

    const imageData = [];

    if (hotelImages && hotelImages.length > 0) {
      imageData.push(
        ...hotelImages.map((url: string) => ({
          hotelId,
          imageUrl: url,
          imageType: 'COVER' as const,
        }))
      );
    }

    if (exterior && exterior.length > 0) {
      imageData.push(
        ...exterior.map((url: string) => ({
          hotelId,
          imageUrl: url,
          imageType: 'EXTERIOR' as const,
        }))
      );
    }

    if (interior && interior.length > 0) {
      imageData.push(
        ...interior.map((url: string) => ({
          hotelId,
          imageUrl: url,
          imageType: 'INTERIOR' as const,
        }))
      );
    }

    const createdImages = await prisma.hotelImages.createMany({
      data: imageData,
    });
    await updateHotelProgress(
      hotelId,
      'step3_hotel_images',
      imageData.length > 0
    );

    res.status(201).json({
      status: 'success',
      data: createdImages,
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

/*
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
*/

/*
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
);*/
