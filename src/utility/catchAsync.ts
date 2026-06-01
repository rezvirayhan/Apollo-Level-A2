import { type NextFunction, type Request, type Response } from "express";

export const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const commonUtils = {
  catchAsync,
};
