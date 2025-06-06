import { NextFunction, Request, Response } from 'express';
export declare const uploadHotelsImages: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const uploadRoomImages: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const resizeAndUploadRoomImages: (req: Request, res: Response, next: NextFunction) => void;
export declare const resizeAndUploadHotelsImages: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=images.controller.d.ts.map