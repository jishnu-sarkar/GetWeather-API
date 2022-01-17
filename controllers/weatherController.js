fetch = require("node-fetch");
// import fetch from "node-fetch";
const lodash = require("lodash");

require("dotenv").config();

const apiKeyWeather = `${process.env.apiKeyWeather}`;
// console.log(apiKeyWeather);

//Get Current Weather by city name
const currentWeatherCity = async (req, res) => {
  if (lodash.isEmpty(req.body)) {
    res
      .status(404)
      .json({ message: "Insufficient Data to Proceess the Request" });
  } else {
    const city = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}`;
    const resUrl = await fetch(url);
    if (!lodash.isEmpty(resUrl)) {
      const result = await resUrl.json();
      console.log(result);
      res.status(202).json({ result });
    } else {
      res.status(404).json({ message: "something went wrong" });
    }
  }
};

//Get Next 7 day Weather by city name
const weeklyWeatherCity = async (req, res) => {
  if (lodash.isEmpty(req.body)) {
    res
      .status(404)
      .json({ message: "Insufficient Data to Proceess the Request" });
  } else {
    const day = req.params.id;
    const city = req.body.city;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}`;
    let resUrl = await fetch(url);
    let result = await resUrl.json();
    const lat = result.coord.lat;
    const long = result.coord.lon;
    const part = "current,minutely,hourly,alerts";
    console.log(lat, long);

    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&appid=${apiKeyWeather}`;
    resUrl = await fetch(url);
    // result = await resUrl.json();
    // console.log(result);

    if (!lodash.isEmpty(resUrl)) {
      const result = await resUrl.json();
      console.log(result);
      res.status(202).json({ result: result });
    } else {
      res.status(404).json({ message: "something went wrong" });
    }
  }
};

//Get Current Weather by latitude and longitude
const currentWeatherLatLong = async (req, res) => {
  if (lodash.isEmpty(req.body)) {
    res
      .status(404)
      .json({ message: "Insufficient Data to Proceess the Request" });
  } else {
    const city = req.body.city;
    const lat = req.body.latitude;
    const long = req.body.longitude;
    const part = "current,minutely,hourly,alerts";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&appid=${apiKeyWeather}`;
    const resUrl = await fetch(url);
    if (!lodash.isEmpty(resUrl)) {
      const result = await resUrl.json();
      console.log(result.current);
      res.status(202).json({ result: result.current });
    } else {
      res.status(404).json({ message: "something went wrong" });
    }
  }
};

//Get Next 7 day by latitude and longitude
const weeklyWeatherLatLong = async (req, res) => {
  if (lodash.isEmpty(req.body)) {
    res
      .status(404)
      .json({ message: "Insufficient Data to Proceess the Request" });
  } else {
    const city = req.body.city;
    const lat = req.body.latitude;
    const long = req.body.longitude;
    const part = "current,minutely,hourly,alerts";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&appid=${apiKeyWeather}`;
    const resUrl = await fetch(url);
    if (!lodash.isEmpty(resUrl)) {
      const result = await resUrl.json();
      console.log(result);
      res.status(202).json({ result });
    } else {
      res.status(404).json({ message: "something went wrong" });
    }
  }
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

// //Get Next 5 day Weather by city name => "BACKUP"
// const weeklyWeatherCity = async (req, res) => {
//   if (lodash.isEmpty(req.body)) {
//     res
//       .status(404)
//       .json({ message: "Insufficient Data to Proceess the Request" });
//   }
//   // const day = req.params.id;
//   const city = req.body.city;
//   const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKeyWeather}`;
//   const resUrl = await fetch(url);
//   if (!lodash.isEmpty(resUrl)) {
//     const result = await resUrl.json();
//     console.log(result);
//     res.status(202).json({ result });
//   } else {
//     res.status(404).json({ message: "something went wrong" });
//   }
// };
