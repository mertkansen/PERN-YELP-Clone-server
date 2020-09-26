import pg from "pg";

import dotenv from "dotenv";
dotenv.config();

// if we put this infos into the .env file, we don't have to put this object into pg.Pool, it'll take from .env automatically.
const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

export const query = (text, params) => pool.query(text, params);
