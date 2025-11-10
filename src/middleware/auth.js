const authenticateApiKey = (req, res, next) => {
  const apiKey = req.params.apiKey;

  if (!apiKey) {
    return res.status(401).json({
      error: "API Key is required",
      message: "Use the format: /api/your-api-key/weather?city=CityName",
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      error: "Invalid API Key",
    });
  }

  next();
};

module.exports = { authenticateApiKey };
