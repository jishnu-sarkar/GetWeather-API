fetch = require("node-fetch");
const _ = require("lodash");

require("dotenv").config();
const apiKeyWeather = `${process.env.apiKeyWeather}`;

//Get Current Weather by city name
const currentWeatherCity = async (req, res) => {
  const city = req.query.cityName;

  console.log(city);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}`;

  const resUrl = await fetch(url);

  if (!_.isEmpty(resUrl)) {
    const result = await resUrl.json();

    console.log(result);

    res.status(202).json({
      location: result.name,
      temperature: result.main.temp,
      date: new Date(result.dt * 1000).toLocaleDateString(),
    });
  } else {
    res.status(404).json({ message: "something went wrong" });
  }
};

//Get Next 7 day Weather by city name
const weeklyWeatherCity = async (req, res) => {
  const city = req.query.cityName;
  console.log(city);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}`;
  let resUrl = await fetch(url);
  let result = await resUrl.json();
  const lat = result.coord.lat;
  const long = result.coord.lon;
  const part = "current,minutely,hourly,alerts";
  console.log(lat, long);
  url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&units=metric&appid=${apiKeyWeather}`;
  resUrl = await fetch(url);
  if (!_.isEmpty(resUrl)) {
    let result = await resUrl.json();
    const location = result.timezone;
    // const data = result.daily;
    // result = result.daily.map((val) => {
    result = _.map(result.daily, (val) => {
      return {
        location: location,
        temperature: val.temp,
        date: new Date(val.dt * 1000).toLocaleDateString(),
      };
    });
    console.log(result);
    res.status(202).json({ result });
  } else {
    res.status(404).json({ message: "something went wrong" });
  }
};

//Get Current Weather by latitude and longitude
const currentWeatherLatLong = async (req, res) => {
  const city = req.query.city;
  const lat = req.query.lat;
  const long = req.query.lon;
  const part = "minutely,hourly,daily,alerts";
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&units=metric&appid=${apiKeyWeather}`;
  const resUrl = await fetch(url);
  if (!_.isEmpty(resUrl)) {
    const result = await resUrl.json();
    console.log(result);
    res.status(202).json({
      // result: result,
      location: result.timezone,
      temperature: result.current.temp,
      date: new Date(result.current.dt * 1000).toLocaleDateString(),
    });
  } else {
    res.status(404).json({ message: "something went wrong" });
  }
};

//Get Next 7 day by latitude and longitude
const weeklyWeatherLatLong = async (req, res) => {
  const city = req.query.city;
  const lat = req.query.lat;
  const long = req.query.lon;
  const part = "current,minutely,hourly,alerts";
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&units=metric&appid=${apiKeyWeather}`;
  const resUrl = await fetch(url);
  if (!_.isEmpty(resUrl)) {
    let result = await resUrl.json();
    const temp = result;
    const location = result.timezone;
    // result = result.daily.map((val) => {
    result = _.map(result.daily, (val) => {
      return {
        location: location,
        temperature: val.temp,
        date: new Date(val.dt * 1000).toLocaleDateString(),
      };
    });
    console.log(result);
    res.status(202).json({ result });
  } else {
    res.status(404).json({ message: "something went wrong" });
  }
};

//Get Current Weather Based upon User's current IP Location
const currentWeatherIP = async (req, res) => {
  let url = `http://ip-api.com/json/`; //getting the ip details
  let resUrl = await fetch(url);
  let result = await resUrl.json();
  const ip = result.query;
  const city = `${result.city}`; //taking the city from details
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}`;
  resUrl = await fetch(url);
  if (!_.isEmpty(resUrl)) {
    const result = await resUrl.json();
    console.log(result);
    res.status(202).json({
      ip: ip,
      location: result.name,
      temperature: result.main.temp,
      date: new Date(result.dt * 1000).toLocaleDateString(),
    });
  } else {
    res.status(404).json({ message: "something went wrong" });
  }
};

module.exports = {
  currentWeatherCity: currentWeatherCity,
  weeklyWeatherCity: weeklyWeatherCity,
  currentWeatherLatLong: currentWeatherLatLong,
  weeklyWeatherLatLong: weeklyWeatherLatLong,
  currentWeatherIP: currentWeatherIP,
};
