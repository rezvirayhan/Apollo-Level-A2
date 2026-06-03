import { pool } from "../../db";
import type { ISignupPayload } from "./auth.interface";

const createUser = async (payload: ISignupPayload, hashedPassword: string) => {
  const { name, email, role } = payload;

  const result = await pool.query(
    `
      INSERT INTO users
      (
        name,
        email,
        password,
        role
      )
      VALUES
      ($1, $2, $3, $4)
      RETURNING
        id,
        name,
        email,
        role,
        created_at,
        updated_at
    `,
    [
      name,
      email,
      hashedPassword,
      role || "contributor", // 👈 default fallback
    ],
  );

  return result.rows[0];
};
const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    `
      SELECT *
      FROM users
      WHERE email = $1
    `,
    [email],
  );

  return result.rows[0];
};

const findUserById = async (id: number) => {
  const result = await pool.query(
    `
      SELECT *
      FROM users
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

export const authModels = {
  createUser,
  findUserByEmail,
  findUserById,
};
