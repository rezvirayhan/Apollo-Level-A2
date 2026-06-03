import { Pool } from "pg";
import config from "../config";
export const pool = new Pool({
  connectionString: config.database_url,
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) DEFAULT 'contributor',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS issues (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        type VARCHAR(30) NOT NULL CHECK (type IN ('bug', 'feature_request')),
        status VARCHAR(30) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
        reporter_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Database Initialized Successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
};
