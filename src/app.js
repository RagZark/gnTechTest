const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Weather API",
      version: "1.0.0",
      description: "Real-time weather data API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", weatherRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Weather API",
    documentation: "/api-docs",
    authentication: "Use API Key in the path: /api/{apiKey}/weather",
    endpoints: {
      weather: {
        getCurrent: "/api/{apiKey}/weather?city={name}",
        getHistory: "/api/{apiKey}/weather/history",
        getCityHistory: "/api/{apiKey}/weather/history/{city}",
        getLatest: "/api/{apiKey}/weather/latest/{city}",
      },
    },
    example: "http://localhost:3000/api/your-api-key/weather?city=São Paulo",
  });
});

module.exports = app;
