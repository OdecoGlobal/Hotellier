import { Request, Response, NextFunction } from "express";
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default function catchAsync(fn: AsyncHandler): (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=catchAsync.d.ts.map