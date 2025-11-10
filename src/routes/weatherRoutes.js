const express = require("express");
const WeatherController = require("../controllers/weatherController");
const { authenticateApiKey } = require("../middleware/auth");

const router = express.Router();

// Apply authentication to ALL routes starting with :apiKey
router.use("/:apiKey", authenticateApiKey);

/**
 * @swagger
 * /api/{apiKey}/weather:
 *   get:
 *     summary: Get current weather data for a city
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *         description: API Key for authentication
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         example: São Paulo
 *     responses:
 *       200:
 *         description: Weather data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     city:
 *                       type: string
 *                     country:
 *                       type: string
 *                     temperature:
 *                       type: number
 *       401:
 *         description: API Key is required
 *       403:
 *         description: Invalid API Key
 */
router.get("/:apiKey/weather", WeatherController.getWeather);

/**
 * @swagger
 * /api/{apiKey}/weather/history:
 *   get:
 *     summary: Get complete weather data history
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: History retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/:apiKey/weather/history", WeatherController.getAllWeather);

/**
 * @swagger
 * /api/{apiKey}/weather/history/{city}:
 *   get:
 *     summary: Get weather history for a specific city
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         example: São Paulo
 *     responses:
 *       200:
 *         description: City history retrieved successfully
 *       404:
 *         description: No data found for this city
 */
router.get(
  "/:apiKey/weather/history/:city",
  WeatherController.getWeatherByCity
);

/**
 * @swagger
 * /api/{apiKey}/weather/latest/{city}:
 *   get:
 *     summary: Get latest weather record for a city
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: apiKey
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         example: London
 *     responses:
 *       200:
 *         description: Latest record retrieved successfully
 *       404:
 *         description: No data found for this city
 */
router.get(
  "/:apiKey/weather/latest/:city",
  WeatherController.getLatestWeatherByCity
);

module.exports = router;
