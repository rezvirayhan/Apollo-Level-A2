import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error?.message || "Something Went Wrong",
    error,
  });
};

export const errorMiddlewares = {
  globalErrorHandler,
};
