const { Pool } = require("pg");

let pool;
let schemaReady;

function getPool() {
  if (!pool) {
    pool = new Pool(
      process.env.DATABASE_URL
        ? { connectionString: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST || "localhost",
            port: Number(process.env.DB_PORT || 5432),
            user: process.env.DB_USER || "user",
            password: process.env.DB_PASSWORD || "pass",
            database: process.env.DB_NAME || "notes",
          }
    );
  }
  return pool;
}

function ensureSchema() {
  if (!schemaReady) {
    schemaReady = getPool()
      .query(
        `CREATE TABLE IF NOT EXISTS notes (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          body TEXT NOT NULL DEFAULT '',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )`
      )
      .catch((err) => {
        console.error("DB init failed (continuing):", err.message);
      });
  }
  return schemaReady;
}

module.exports = { getPool, ensureSchema };
