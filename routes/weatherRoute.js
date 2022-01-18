const express = require("express");
const weatherController = require("../controllers/weatherController");
const router = express.Router();

router.post("/", weatherController.currentWeatherCity);

router.post("/w", weatherController.weeklyWeatherCity); //id in betweet 1-16 we will use only 7 : w demo

router.post("/latlong", weatherController.currentWeatherLatLong);

router.post("/latlong/w", weatherController.weeklyWeatherLatLong); //id in betweet 1-16 we will use only 7 : w demo

router.get("/", weatherController.currentWeatherIP);

module.exports = router;
