const express = require("express");
const router = express.Router();
const weatherControllerDB = require("../controllers/weatherControllerDB");
const validationController = require("../controllers/validationController");

router.get(
  "/city",
  validationController.validateUser,
  weatherControllerDB.currentWeatherCity
);

router.get(
  "/city/forecast",
  validationController.validateUser,
  weatherControllerDB.weeklyWeatherCity
);

router.get(
  "/geolocation",
  validationController.validateUser,
  weatherControllerDB.currentWeatherLatLong
);

router.get(
  "/geolocation/forecast",
  validationController.validateUser,
  weatherControllerDB.weeklyWeatherLatLong
);

router.get(
  "/",
  validationController.validateUser,
  weatherControllerDB.currentWeatherIP
);

module.exports = router;
