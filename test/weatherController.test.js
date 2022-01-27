const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

require("dotenv").config();
const apiKeyWeather = `${process.env.apiKeyWeather}`;

const fetchLib = require("../library/fetchAPI");

const weatherController = require("../controllers/weatherController");

describe("weatherController", () => {
  describe("getting currentWeather by City", () => {
    let date, req, res, json, status, fetch;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      fetch = sinon.stub(fetchLib, "fetch");
      date = Math.floor(new Date().getTime() / 1000);
    });
    afterEach(() => {
      fetch.restore();
    });

    it("Not Getting Weather", async () => {
      req = {
        query: {
          cityName: "Jishnu",
        },
      };
      fetch.resolves(null);
      const result = await weatherController.currentWeatherCity(req, res);
      expect(status.calledWith(404)).to.be.true;
      expect(json.calledWith({ message: "something went wrong" })).to.be.true;
    });

    it("Getting Weather", async () => {
      req = {
        query: {
          cityName: "Jishnu",
        },
      };

      fetch.resolves({
        json: () => {
          return Promise.resolve({
            name: "Jishnu",
            main: {
              temp: "30",
            },
            dt: date,
            // dt: new Date(date * 1000).toLocaleDateString(),
          });
        },
      });

      const result = await weatherController.currentWeatherCity(req, res);
      expect(status.calledWith(202)).to.be.true;
      expect(
        json.calledWith({
          location: "Jishnu",
          temperature: "30",
          date: new Date(date * 1000).toLocaleDateString(),
        })
      ).to.be.true;
    });

    it("Error Happend", async () => {
      req = {
        query: {
          cityName: "Jishnu",
        },
      };

      fetch.rejects(new Error("I am an ERROR ^_^"));

      const result = await weatherController.currentWeatherCity(req, res);

      expect(status.calledWith(464)).to.be.true;
      expect(json.calledWith({ message: "I am an ERROR ^_^" })).to.be.true;
    });
  });
});
