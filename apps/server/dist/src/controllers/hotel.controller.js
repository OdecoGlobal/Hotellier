"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoom = exports.deleteHotel = exports.updatePolicies = exports.updateHotelBasicInfo = exports.createHotel = exports.getHotelById = void 0;
// import { getAllHotelsActions } from '../actions/hotel.actions';
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const prisma_1 = require("../db/prisma");
const shared_1 = require("@hotellier/shared");
const appError_1 = __importDefault(require("../utils/appError"));
async function updateHotelProgress(hotelId, stepKey, isCompleted) {
    const hotel = await prisma_1.prisma.hotel.findUnique({ where: { id: hotelId } });
    if (!hotel)
        throw new Error('Hotel not found');
    const completionSteps = hotel.completionSteps;
    completionSteps[stepKey] = isCompleted;
    const completedCount = Object.values(completionSteps).filter(Boolean).length;
    const currentStep = calculateCurrentStep(completionSteps);
    const isFullyCompleted = completedCount === 6;
    let status = hotel.status;
    if (isFullyCompleted && status === 'DRAFT') {
        status = 'PENDING_REVIEW';
    }
    else if (completedCount > 0 && status === 'DRAFT') {
        status = 'IN_PROGRESS';
    }
    await prisma_1.prisma.hotel.update({
        where: { id: hotelId },
        data: {
            completionSteps,
            currentStep,
            isFullyCompleted,
            status,
        },
    });
}
function calculateCurrentStep(completionSteps) {
    const steps = [
        'step1_basic_info',
        'step2_policies',
        'step3_rooms',
        'step4_rates',
        'step5_amenities',
        'step6_contract',
    ];
    for (let i = 0; i < steps.length; i++) {
        if (!completionSteps[steps[i]]) {
            return i + 1;
        }
    }
    return 6; // All completed
}
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
exports.getHotelById = (0, catchAsync_1.default)(async (req, res, next) => {
    const { hotelId } = req.params;
    const data = await prisma_1.prisma.hotel.findFirst({
        where: { id: hotelId },
    });
    res.status(200).json({
        data,
    });
});
exports.createHotel = (0, catchAsync_1.default)(async (req, res) => {
    const authReq = req;
    const hotel = await prisma_1.prisma.hotel.create({
        data: {
            ownerId: authReq.user.id,
            status: 'DRAFT',
            completionSteps: {
                step1_basic_info: false,
                step2_policies: false,
                step3_rooms: false,
                step4_rates: false,
                step5_amenities: false,
                step6_contract: false,
            },
            currentStep: 1,
            totalSteps: 6,
        },
    });
    res.status(201).json({
        status: 'success',
        data: hotel,
    });
});
exports.updateHotelBasicInfo = (0, catchAsync_1.default)(async (req, res, next) => {
    const data = shared_1.hotelBasicInfoSchema.parse(req.body);
    const slug = (0, shared_1.generateSlugFromName)(data.name);
    const { hotelId } = req.params;
    const basicInfo = await prisma_1.prisma.hotelBasicInfo.upsert({
        where: { hotelId },
        update: {
            ...data,
            slug: slug,
            isCompleted: true,
            completedAt: new Date(),
        },
        create: {
            ...data,
            hotelId,
            slug: slug,
            isCompleted: true,
            completedAt: new Date(),
        },
    });
    await updateHotelProgress(hotelId, 'step1_basic_info', basicInfo.isCompleted);
    res.status(200).json({
        status: 'success',
        data: basicInfo,
    });
});
exports.updatePolicies = (0, catchAsync_1.default)(async (req, res, next) => {
    const { hotelId } = req.params;
    const policiesData = shared_1.hotelPolicySchema.parse(req.body);
    const policies = await prisma_1.prisma.hotelPolicy.upsert({
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
});
exports.deleteHotel = (0, catchAsync_1.default)(async (req, res, next) => {
    const authReq = req;
    const { hotelId } = req.params;
    const hotelExist = await prisma_1.prisma.hotel.findUnique({
        where: { id: hotelId },
    });
    if (!hotelExist)
        return next(new appError_1.default('Hotel not found', 400));
    if (hotelExist.ownerId !== authReq.user.id &&
        authReq.user.role !== 'ADMIN') {
        return next(new appError_1.default('You do not have permission to update this hotel', 403));
    }
    await prisma_1.prisma.hotel.delete({
        where: { id: hotelId },
    });
    res.status(204).json({
        status: 'Success',
        data: null,
    });
});
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
    await updateHotelProgress(hotelId, 'step3_rooms', completedRooms > 0);
    res.status(201).json({
        status: 'success',
        data: room,
    });
});
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
