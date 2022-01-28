const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

router.get("/city", weatherController.currentWeatherCity);

router.get("/city/forecast", weatherController.weeklyWeatherCity);

router.get("/geolocation", weatherController.currentWeatherLatLong);

router.get("/geolocation/forecast", weatherController.weeklyWeatherLatLong);

router.get("/", weatherController.currentWeatherIP);

module.exports = router;
