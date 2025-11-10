const axios = require("axios");
const Weather = require("../models/Weather");

class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://api.weatherapi.com/v1";
  }

  async getWeatherByCity(city, country = "") {
    try {
      const response = await axios.get(`${this.baseURL}/current.json`, {
        params: {
          q: country ? `${city},${country}` : city,
          key: this.apiKey,
          lang: "pt",
        },
        timeout: 10000,
      });
      console.log("Data recived");

      const weatherData = this.transformWeatherData(response.data);

      try {
        const saveData = await Weather.create(weatherData);
        console.log("Data saved in DB");
        return saveData;
      } catch (dbError) {
        console.log("DB error, returning API data only:", dbError.message);
        return weatherData;
      }
    } catch (error) {
      console.error(
        "Error: Can't search data: ",
        error.response?.data || error.message
      );
      throw new Error("Cant find data.");
    }
  }

  transformWeatherData(apiData) {
    return {
      city: apiData.location.name,
      country: apiData.location.country,
      temperature: apiData.current.temp_c,
    };
  }

  async getStoredWeather() {
    return await Weather.findAll();
  }

  async getStoredWeatherByCity(city) {
    const stored = await Weather.findByCity(city);

    if (stored.length > 0) {
      return stored;
    }

    console.log(`No data for ${city} in DB — fetching from API...`);
    const apiData = await this.getWeatherByCity(city);
    return [apiData];
  }

  async getLatestStoredWeatherByCity(city) {
    return await Weather.getLatestByCity(city);
  }
}

module.exports = WeatherService;
