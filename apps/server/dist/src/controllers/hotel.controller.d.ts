import { NextFunction, Request, Response } from 'express';
type StepKey = 'step1_basic_info' | 'step2_policies' | 'step3_hotel_images' | 'step4_rooms' | 'step5_rates' | ' step6_amenities';
export declare function updateHotelProgress(hotelId: string, stepKey: StepKey, isCompleted: boolean): Promise<void>;
export declare const getHotelById: (req: Request, res: Response, next: NextFunction) => void;
export declare const createHotel: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateHotelBasicInfo: (req: Request, res: Response, next: NextFunction) => void;
export declare const updatePolicies: (req: Request, res: Response, next: NextFunction) => void;
export declare const addHotelImages: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteHotel: (req: Request, res: Response, next: NextFunction) => void;
export declare const addRoom: (req: Request, res: Response, next: NextFunction) => void;
export declare const addRoomImages: (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=hotel.controller.d.ts.map