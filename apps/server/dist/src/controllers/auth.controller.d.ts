import { Response, Request, NextFunction } from 'express-serve-static-core';
import { Role } from '@prisma/client';
export declare const signUp: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export declare const signUpHotelOwners: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export declare const login: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export declare const logout: (req: Request, res: Response) => void;
export declare const protect: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export declare const restrictTo: (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateHotelOwnerShip: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=auth.controller.d.ts.map