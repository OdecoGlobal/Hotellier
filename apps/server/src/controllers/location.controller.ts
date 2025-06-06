import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { prisma } from '../db/prisma';
import { Prisma } from '@prisma/client';

export const getAllCountries = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      search,
      limit = '10',
      page = '1',
      sortBy = 'name',
      sortOrder = 'asc',
    } = req.query;

    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const searchFilter: Prisma.CountryWhereInput =
      search && search !== 'all'
        ? {
            name: {
              contains: search,
              mode: 'insensitive',
            } as Prisma.StringFilter,
          }
        : {};

    const orderBy: Prisma.CountryOrderByWithRelationInput = {
      [sortBy as string]: sortOrder as 'asc' | 'desc',
    };

    const countries = await prisma.country.findMany({
      where: {
        ...searchFilter,
      },
      orderBy: orderBy,
      skip: skip,
      take: limitNum,
    });

    const totalCount = await prisma.country.count({
      where: { ...searchFilter },
    });
    const totalPages = Math.ceil(totalCount / limitNum);

    res.status(200).json({
      status: 'success',
      data: { countries, totalPages },
    });
  }
);

export const getAllStates = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      search,
      limit = '10',
      page = '1',
      sortBy = 'name',
      sortOrder = 'asc',
    } = req.query;

    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const searchFilter: Prisma.StateWhereInput =
      search && search !== 'all'
        ? {
            name: {
              contains: search,
              mode: 'insensitive',
            } as Prisma.StringFilter,
          }
        : {};

    const orderBy: Prisma.StateOrderByWithRelationInput = {
      [sortBy as string]: sortOrder as 'asc' | 'desc',
    };

    const states = await prisma.state.findMany({
      where: {
        ...searchFilter,
      },
      orderBy: orderBy,
      skip: skip,
      take: limitNum,
    });

    const totalCount = await prisma.state.count({
      where: { ...searchFilter },
    });
    const totalPages = Math.ceil(totalCount / limitNum);

    res.status(200).json({
      status: 'success',
      data: { states, totalPages },
    });
  }
);

export const getStatesByCountry = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { countryId } = req.params;

    const {
      search,
      limit = '10',
      page = '1',
      sortBy = 'name',
      sortOrder = 'asc',
    } = req.query;

    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const searchFilter: Prisma.StateWhereInput =
      search && search !== 'all'
        ? {
            name: {
              contains: search,
              mode: 'insensitive',
            } as Prisma.StringFilter,
          }
        : {};

    const orderBy: Prisma.CityOrderByWithRelationInput = {
      [sortBy as string]: sortOrder as 'asc' | 'desc',
    };

    const states = await prisma.state.findMany({
      where: { countryId, ...searchFilter },
      orderBy,
      take: limitNum,
      skip,
    });

    const totalCount = await prisma.state.count({
      where: {
        countryId,
        ...searchFilter,
      },
    });
    const totalPages = Math.ceil(totalCount / limitNum);

    res.status(200).json({
      status: 'success',
      data: {
        states,
        totalPages,
      },
    });
  }
);

export const getAllCities = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      search,
      limit = '10',
      page = '1',
      sortBy = 'name',
      sortOrder = 'asc',
    } = req.query;

    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const searchFilter: Prisma.CityWhereInput =
      search && search !== 'all'
        ? {
            name: {
              contains: search,
              mode: 'insensitive',
            } as Prisma.StringFilter,
          }
        : {};

    const orderBy: Prisma.CityOrderByWithRelationInput = {
      [sortBy as string]: sortOrder as 'asc' | 'desc',
    };

    const cities = await prisma.city.findMany({
      where: {
        ...searchFilter,
      },
      orderBy: orderBy,
      skip: skip,
      take: limitNum,
    });

    const totalCount = await prisma.city.count({
      where: { ...searchFilter },
    });
    const totalPages = Math.ceil(totalCount / limitNum);

    res.status(200).json({
      status: 'success',
      data: { cities, totalPages },
    });
  }
);

export const getCitiesByState = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { stateId } = req.params;
    const {
      search,
      limit = '10',
      page = '1',
      sortBy = 'name',
      sortOrder = 'asc',
    } = req.query;

    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const searchFilter: Prisma.CityWhereInput =
      search && search !== 'all'
        ? {
            name: {
              contains: search,
              mode: 'insensitive',
            } as Prisma.StringFilter,
          }
        : {};

    const orderBy: Prisma.CityOrderByWithRelationInput = {
      [sortBy as string]: sortOrder as 'asc' | 'desc',
    };

    const cities = await prisma.city.findMany({
      where: { stateId, ...searchFilter },
      orderBy,
      skip,
      take: limitNum,
    });

    const totalCount = await prisma.city.count({
      where: { stateId, ...searchFilter },
    });
    res.status(200).json({
      status: 'success',
      data: {
        cities,
        totalCount,
      },
    });
  }
);
