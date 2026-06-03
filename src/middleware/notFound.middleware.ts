import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Route Not Found",
  });
};

export const notFoundMiddlewares = {
  notFound,
};
