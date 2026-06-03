import { type NextFunction, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { AuthRequest } from "../interfaces/common";

const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };

export const roleMiddlewares = {
  authorize,
};
