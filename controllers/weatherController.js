const lodash = require("lodash");

//Get Current Weather by city name
const currentWeatherCity = async (req, res) => {
  const result = await result;
};

//Get Next 7 day Weather by city name
const weeklyWeatherCity = async (req, res) => {
  const result = await result;
};

//Get Current Weather by latitude and longitude
const currentWeatherLatLong = async (req, res) => {
  const result = await result;
};

//Get Next 7 day by latitude and longitude
const weeklyWeatherLatLong = async (req, res) => {
  const result = await result;
};

//Get Current Weather Based upon User's current IP Location
const currentWeatherIP = async (req, res) => {
  const result = await result;
};

module.exports = {
  currentWeatherCity: currentWeatherCity,
  weeklyWeatherCity: weeklyWeatherCity,
  currentWeatherLatLong: currentWeatherLatLong,
  weeklyWeatherLatLong: weeklyWeatherLatLong,
  currentWeatherIP: currentWeatherIP,
};
