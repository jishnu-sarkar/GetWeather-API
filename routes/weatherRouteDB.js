const express = require("express");
const router = express.Router();
const weatherControllerDB = require("../controllers/weatherControllerDB");

router.get("/city", weatherControllerDB.currentWeatherCity);

router.get("/city/forecast", weatherControllerDB.weeklyWeatherCity);

router.get("/latlon", weatherControllerDB.currentWeatherLatLong);

router.get("/latlon/forecast", weatherControllerDB.weeklyWeatherLatLong);

router.get("/", weatherControllerDB.currentWeatherIP);

module.exports = router;
