const WeatherService = require("../services/weatherService");

class WeatherController {
  static async getWeather(req, res) {
    try {
      const { city, country } = req.query;

      if (!city) {
        return res.status(400).json({
          error: "City parameter is necessary!",
        });
      }

      const weatherService = new WeatherService(
        process.env.OPENWEATHER_API_KEY
      );

      const weatherData = await weatherService.getWeatherByCity(city, country);

      res.json({
        message: "Weather data obtained and saved successfully",
        data: weatherData,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllWeather(req, res) {
    try {
      const weatherService = new WeatherService(
        process.env.OPENWEATHER_API_KEY
      );
      const weatherData = await weatherService.getStoredWeather();

      res.json({
        count: weatherData.length,
        data: weatherData,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getWeatherByCity(req, res) {
    try {
      const { city } = req.params;
      const weatherService = new WeatherService(
        process.env.OPENWEATHER_API_KEY
      );
      const weatherData = await weatherService.getStoredWeatherByCity(city);

      res.json({
        count: weatherData.length,
        data: weatherData,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getLatestWeatherByCity(req, res) {
    try {
      const { city } = req.params;
      const weatherService = new WeatherService(
        process.env.OPENWEATHER_API_KEY
      );
      const weatherData = await weatherService.getLatestStoredWeatherByCity(
        city
      );

      if (!weatherData) {
        return res.status(404).json({
          error: "No data found for this city",
        });
      }

      res.json({
        data: weatherData,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = WeatherController;
