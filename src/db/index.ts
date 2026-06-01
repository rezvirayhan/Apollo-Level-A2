import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
  try {
    await pool.query(`
CREATE TABLE IF NOT EXISTS users (
 id SERIAL PRIMARY KEY,

created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()

)
      `);

    await pool.query(`
CREATE TABLE IF NOT EXISTS profiles(
  id SERIAL PRIMARY KEY,


  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
`);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
