const sinon = require("sinon");
const chai = require("chai");

const chaiFetch = require("chai-fetch");
chai.use(chaiFetch);

const expect = chai.expect;
require("dotenv").config();
const apiKeyWeather = `${process.env.apiKeyWeather}`;

const weatherController = require("../controllers/weatherController");
const { currentWeatherCity } = require("../controllers/weatherController");

describe("weatherController", () => {
  describe("currentWeatherCity", () => {
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.stub();
      status.returns({ json });
    });

    let req = { query: { cityName: "kolkata" } };
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.cityName}&units=metric&appid=${apiKeyWeather}`;

    // it("should get current weather using user IP", async function () {
    //   // expect(2 + 2 == 4).to.be.true;
    //   await weatherController.currentWeatherCity(req, res);
    //   expect(result.withArgs(req, res).calledOnce).to.be.true;
    // });
    it("should get 7", async () => {
      await fetch(url)
        .then((res) => {
          const temp = await.json();
          console.log(temp);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          expect({ title: 1 }).to.be.true;
        });
    });
  });
  //   describe();
});
