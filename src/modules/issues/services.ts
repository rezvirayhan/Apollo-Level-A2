import { StatusCodes } from "http-status-codes";
import { pool } from "../../db";

import type { AuthRequest } from "../../interfaces/common";
import type { ICreateIssue, IUpdateIssue } from "./interface";
import { issueModels } from "./model";

const createIssue = async (
  payload: ICreateIssue,
  user: AuthRequest["user"],
) => {
  if (!user) {
    throw {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: "Unauthorized",
    };
  }

  return issueModels.createIssue(payload, user.id);
};

const getIssues = async (query: any) => {
  let issues = await issueModels.getIssues();

  const { type, status, sort } = query;

  if (type) {
    issues = issues.filter((i) => i.type === type);
  }

  if (status) {
    issues = issues.filter((i) => i.status === status);
  }

  if (sort === "oldest") {
    issues = issues.reverse();
  }

  const reporterIds = [...new Set(issues.map((i) => i.reporter_id))];

  const usersResult = await pool.query(
    `
      SELECT id, name, email, role
      FROM users
      WHERE id = ANY($1)
    `,
    [reporterIds],
  );

  const usersMap = new Map(usersResult.rows.map((u) => [u.id, u]));

  const enriched = issues.map((issue) => ({
    ...issue,
    reporter: usersMap.get(issue.reporter_id) || null,
  }));

  return enriched;
};

const getIssueById = async (id: number) => {
  const issue = await issueModels.getIssueById(id);

  if (!issue) {
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: "Issue not found",
    };
  }

  const userResult = await pool.query(
    `
      SELECT id, name, email, role
      FROM users
      WHERE id = $1
    `,
    [issue.reporter_id],
  );

  return {
    ...issue,
    reporter: userResult.rows[0] || null,
  };
};

const updateIssue = async (
  id: number,
  payload: IUpdateIssue,
  user: AuthRequest["user"],
) => {
  const issue = await issueModels.getIssueById(id);

  if (!issue) {
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: "Issue not found",
    };
  }

  if (!user) {
    throw {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: "Unauthorized",
    };
  }
  if (user.role === "maintainer") {
    return issueModels.updateIssue(id, payload);
  }

  if (issue.reporter_id !== user.id) {
    throw {
      statusCode: StatusCodes.FORBIDDEN,
      message: "You cannot update this issue",
    };
  }

  if (issue.status !== "open") {
    throw {
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Only open issues can be updated",
    };
  }
  const allowed: IUpdateIssue = {};

  if (payload.title !== undefined) {
    allowed.title = payload.title;
  }
  if (payload.description !== undefined) {
    allowed.description = payload.description;
  }
  if (payload.type !== undefined) {
    allowed.type = payload.type;
  }
  return issueModels.updateIssue(id, allowed);
};

const deleteIssue = async (id: number, user: AuthRequest["user"]) => {
  const issue = await issueModels.getIssueById(id);

  if (!issue) {
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: "Issue not found",
    };
  }

  if (!user || user.role !== "maintainer") {
    throw {
      statusCode: StatusCodes.FORBIDDEN,
      message: "Only maintainer can delete",
    };
  }

  return issueModels.deleteIssue(id);
};

export const issueServices = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};
