const _ = require("lodash");

require("dotenv").config();
const apiKeyWeather = `${process.env.apiKeyWeather}`;

const fetchAPI = require("../library/fetchAPI");
const db = require("../models");

//Get Current Weather by city name
const currentWeatherCity = async (req, res) => {
  try {
    const id = Math.floor(100000 + Math.random() * 900000);
    const userId = req.query.id;
    const city = req.query.cityName;

    //   console.log(city);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}`;

    const resUrl = await fetchAPI.fetch(url);

    if (_.isEmpty(resUrl)) {
      return res.status(404).json({ message: "something went wrong" });
    }

    const result = await resUrl.json();

    //database insertion
    const searchItem = {
      Request: "Weather by City Name",
      Response: {
        location: result.name,
        temperature: result.main.temp,
        date: new Date(result.dt * 1000).toLocaleDateString(),
      },
    };

    const searchData = {
      id: id,
      searchItem: JSON.stringify(searchItem),
      userId: userId,
    };

    const insertSearchData = await db.sequelize.models.Search.insertSearchData(
      searchData
    );

    console.log(result);
    return res.status(202).json({
      // userId: userId,
      location: result.name,
      temperature: result.main.temp,
      date: new Date(result.dt * 1000).toLocaleDateString(),
    });
  } catch (err) {
    return res.status(464).json({ message: err.message });
  }
};

//Get Next 7 day Weather by city name
const weeklyWeatherCity = async (req, res) => {
  try {
    const id = Math.floor(100000 + Math.random() * 900000);
    const userId = req.query.id;
    const city = req.query.cityName;
    //   console.log(city);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}`;
    let resUrl = await fetchAPI.fetch(url);
    let result = await resUrl.json();

    const lat = result.coord.lat;
    const long = result.coord.lon;
    const part = "current,minutely,hourly,alerts";
    //   console.log(lat, long);

    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&units=metric&appid=${apiKeyWeather}`;
    resUrl = await fetchAPI.fetch(url);

    if (_.isEmpty(resUrl)) {
      return res.status(404).json({ message: "something went wrong" });
    }

    result = await resUrl.json();
    const location = result.timezone;

    result = _.map(result.daily, (val) => {
      return {
        location: location,
        temperature: val.temp,
        date: new Date(val.dt * 1000).toLocaleDateString(),
      };
    });

    // const searchItem = {
    //   Request: "Weather by City Name",
    //   Response: {
    //     result,
    //   },
    // };

    // console.log(_.last(result).date);

    const searchItem = {
      Request: "Weekly Weather by City Name",
      Response: {
        location: _.head(result).location,
        from: _.head(result).date,
        to: _.last(result).date,
      },
    };

    // const searchItem = result;

    // console.log(searchItem);

    const searchData = {
      id: id,
      searchItem: JSON.stringify(searchItem),
      userId: userId,
    };

    const insertSearchData = await db.sequelize.models.Search.insertSearchData(
      searchData
    );

    console.log(result);
    return res.status(202).json({ result });
  } catch (err) {
    console.log(err.message);
    return res.status(464).json({ message: err.message });
  }
};

//Get Current Weather by latitude and longitude
const currentWeatherLatLong = async (req, res) => {
  try {
    const id = Math.floor(100000 + Math.random() * 900000);
    const userId = req.query.id;
    const lat = req.query.lat;
    const long = req.query.lon;
    const part = "minutely,hourly,daily,alerts";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&units=metric&appid=${apiKeyWeather}`;
    const resUrl = await fetchAPI.fetch(url);

    if (_.isEmpty(resUrl)) {
      return res.status(404).json({ message: "something went wrong" });
    }

    const result = await resUrl.json();
    console.log(result);

    const searchItem = {
      Request: "Weather by Latitude & Longitude",
      Response: {
        location: result.timezone,
        latitude: lat,
        longitude: long,
        temperature: result.current.temp,
        date: new Date(result.current.dt * 1000).toLocaleDateString(),
      },
    };

    const searchData = {
      id: id,
      searchItem: JSON.stringify(searchItem),
      userId: userId,
    };

    const insertSearchData = await db.sequelize.models.Search.insertSearchData(
      searchData
    );

    return res.status(202).json({
      // userId:userId,
      location: result.timezone,
      latitude: lat,
      longitude: long,
      temperature: result.current.temp,
      date: new Date(result.current.dt * 1000).toLocaleDateString(),
    });
  } catch (err) {
    console.log(err.message);
    return res.status(464).json({ message: err.message });
  }
};

//Get Next 7 day by latitude and longitude
const weeklyWeatherLatLong = async (req, res) => {
  try {
    const id = Math.floor(100000 + Math.random() * 900000);
    const userId = req.query.id;
    const lat = req.query.lat;
    const long = req.query.lon;

    const part = "current,minutely,hourly,alerts";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&units=metric&appid=${apiKeyWeather}`;
    const resUrl = await fetchAPI.fetch(url);

    if (_.isEmpty(resUrl)) {
      return res.status(404).json({ message: "something went wrong" });
    }

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

    // const searchItem = {
    //   Request: "Weekly Weather by GeoLocation",
    //   Response: {
    //     result,
    //   },
    // };

    const searchItem = {
      Request: "Weekly Weather by GeoLocation",
      Response: {
        location: _.head(result).location,
        latitude: lat,
        longitude: long,
        from: _.head(result).date,
        to: _.last(result).date,
      },
    };

    const searchData = {
      id: id,
      searchItem: JSON.stringify(searchItem),
      userId: userId,
    };

    const insertSearchData = await db.sequelize.models.Search.insertSearchData(
      searchData
    );

    console.log(result);
    return res.status(202).json({ result });
  } catch (err) {
    console.log(err.message);
    return res.status(464).json({ message: err.message });
  }
};

//Get Current Weather Based upon User's current IP Location
const currentWeatherIP = async (req, res) => {
  try {
    const id = Math.floor(100000 + Math.random() * 900000);
    const userId = req.query.id;

    let url = `http://ip-api.com/json/`; //getting the ip details
    let resUrl = await fetchAPI.fetch(url);
    let result = await resUrl.json();

    const ip = `${result.query}`;
    const city = `${result.city}`; //taking the city from details

    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}`;
    resUrl = await fetchAPI.fetch(url);
    if (_.isEmpty(resUrl)) {
      return res.status(404).json({ message: "something went wrong" });
    }

    result = await resUrl.json();

    const searchItem = {
      Request: "Weather by IP",
      Response: {
        ip: ip,
        location: result.name,
        temperature: result.main.temp,
        date: new Date(result.dt * 1000).toLocaleDateString(),
      },
    };

    const searchData = {
      id: id,
      searchItem: JSON.stringify(searchItem),
      userId: userId,
    };

    const insertSearchData = await db.sequelize.models.Search.insertSearchData(
      searchData
    );

    console.log(result);
    return res.status(202).json({
      // userId: userId,
      ip: ip,
      location: result.name,
      temperature: result.main.temp,
      date: new Date(result.dt * 1000).toLocaleDateString(),
    });
  } catch (err) {
    console.log(err.message);
    return res.status(464).json({ message: err.message });
  }
};

module.exports = {
  currentWeatherCity: currentWeatherCity,
  weeklyWeatherCity: weeklyWeatherCity,
  currentWeatherLatLong: currentWeatherLatLong,
  weeklyWeatherLatLong: weeklyWeatherLatLong,
  currentWeatherIP: currentWeatherIP,
};
