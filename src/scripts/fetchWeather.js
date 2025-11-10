require("dotenv").config();
const WeatherService = require("../services/weatherService");

async function fetchWeatherData() {
  const weatherService = new WeatherService(process.env.OPENWEATHER_API_KEY);

  const cities = [
    "São Paulo",
    "Rio de Janeiro",
    "Florianopolis",
    "Tokyo",
    "Paris",
  ];

  for (const city of cities) {
    try {
      const result = await weatherService.getStoredWeatherByCity(city);
      console.log(`Result for ${city}:`, result);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      console.log(`Not found data from ${city}:`, err.message);
    }
  }
}

if (require.main === module) {
  fetchWeatherData()
    .then(() => process.exit(0))
    .catch((err) => {
      console.log("Execution error:", err.message);
    });
}

module.exports = fetchWeatherData;
