const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

router.get("/city", weatherController.currentWeatherCity);

router.get("/city/forecast", weatherController.weeklyWeatherCity);

router.get("/geolocation", weatherController.currentWeatherLatLong);

router.get("/geolocation/forecast", weatherController.weeklyWeatherLatLong); //id in betweet 1-16 we will use only 7 : w demo

router.get("/", weatherController.currentWeatherIP);

module.exports = router;
