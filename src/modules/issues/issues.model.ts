import { pool } from "../../db";
import type { ICreateIssue, IUpdateIssue } from "./issues.interface";

const createIssue = async (payload: ICreateIssue, reporter_id: number) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
      INSERT INTO issues (
        title,
        description,
        type,
        reporter_id
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    [title, description, type, reporter_id],
  );

  return result.rows[0];
};

const getIssues = async () => {
  const result = await pool.query(`
    SELECT * FROM issues
    ORDER BY created_at DESC
  `);

  return result.rows;
};

const getIssueById = async (id: number) => {
  const result = await pool.query(
    `
      SELECT * FROM issues
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

const updateIssue = async (id: number, payload: IUpdateIssue) => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  for (const key in payload) {
    fields.push(`${key} = $${index}`);
    values.push((payload as any)[key]);
    index++;
  }

  values.push(id);

  const result = await pool.query(
    `
      UPDATE issues
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${index}
      RETURNING *
    `,
    values,
  );

  return result.rows[0];
};

const deleteIssue = async (id: number) => {
  const result = await pool.query(
    `
      DELETE FROM issues
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0];
};

export const issueModels = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};
