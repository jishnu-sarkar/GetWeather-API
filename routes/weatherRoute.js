const express = require("express");
const weatherController = require("../controllers/weatherController");
const router = express.Router();

router.get("/city", weatherController.currentWeatherCity);

router.get("/city/forecast", weatherController.weeklyWeatherCity);

router.get("/latlon", weatherController.currentWeatherLatLong);

router.get("/latlon/forecast", weatherController.weeklyWeatherLatLong); //id in betweet 1-16 we will use only 7 : w demo

router.get("/", weatherController.currentWeatherIP);

module.exports = router;
