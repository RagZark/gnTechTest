const pool = require("../config/database");

class Weather {
  static async create(weatherData) {
    const { city, country, temperature } = weatherData;

    const query = `
    INSERT INTO weather_data
    (city, country, temperature) VALUES ($1, $2, $3)
    RETURNING *;
  `;

    const values = [city, country, temperature];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = `SELECT * FROM weather_data ORDER BY created_at DESC;`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findByCity(city) {
    const query =
      "SELECT * FROM weather_data WHERE city ILIKE $1 ORDER BY created_at DESC;";
    const result = await pool.query(query, [city]);
    return result.rows;
  }

  static async findById(id) {
    const query = "SELECT * FROM weather_data WHERE id = $1;";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getLatestByCity(city) {
    const query = `
      SELECT DISTINCT ON (city) *
      FROM weather_data 
      WHERE city ILIKE $1 
      ORDER BY city, created_at DESC;
    `;
    const result = await pool.query(query, [city]);
    return result.rows[0];
  }
}

module.exports = Weather;
