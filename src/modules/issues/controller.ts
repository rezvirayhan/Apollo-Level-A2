import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { AuthRequest } from "../../interfaces/common";
import { catchAsync } from "../../utility/catchAsync";
import { issueServices } from "./services";
const create = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await issueServices.createIssue(req.body, req.user);
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Issue created successfully",
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await issueServices.getIssues(req.query);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Issues fetched successfully",
    data: result,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await issueServices.getIssueById(Number(req.params.id));

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Issue fetched successfully",
    data: result,
  });
});

const update = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await issueServices.updateIssue(
    Number(req.params.id),
    req.body,
    req.user,
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Issue updated successfully",
    data: result,
  });
});

const remove = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await issueServices.deleteIssue(
    Number(req.params.id),
    req.user,
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Issue deleted successfully",
    data: result,
  });
});

export const issueControllers = {
  create,
  getAll,
  getById,
  update,
  remove,
};
