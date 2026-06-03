import { type NextFunction, type Response } from "express";

import { StatusCodes } from "http-status-codes";
import type { AuthRequest } from "../interfaces/common";
import { verifyToken } from "../utility/jwt";

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = verifyToken(token);

    req.user = decoded as any;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export const authMiddlewares = {
  auth,
};
