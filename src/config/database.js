const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: false,
});

const initializeDatabase = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("DB CONNECTION");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS weather_data (
        id SERIAL PRIMARY KEY,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(10),
        temperature DECIMAL(4,1),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("CREATE TABLE WEATHER_DATA");
  } catch (error) {
    console.error("DB INIT ERROR:", error.message);
  }
};

initializeDatabase();

module.exports = pool;
