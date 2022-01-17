const express = require("express");
const weatherController = require("../controllers/weatherController");
const router = express.Router();

router.get("/", weatherController.currentWeatherCity);

router.post("/", weatherController.currentWeatherCity);

router.post("/:id", weatherController.weeklyWeatherCity);

router.post("/ip");

module.exports = router;
