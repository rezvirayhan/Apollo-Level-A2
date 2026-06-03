import { type Request, type Response } from "express";

import { StatusCodes } from "http-status-codes";

import { catchAsync } from "../../utility/catchAsync";
import { authServices } from "./auth.service";

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.signupUser(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUser(req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const authControllers = {
  signup,
  login,
};
