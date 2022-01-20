const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

require("dotenv").config();
const apiKeyWeather = `${process.env.apiKeyWeather}`;

const fetchLib = require("../library/fetchAPI");

const weatherController = require("../controllers/weatherController");

describe("weatherController", () => {
  describe("getting currentWeather by IP", () => {
    let date, req, res, json, status, fetch;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      fetch = sinon.stub(fetchLib, "fetch");
      date = new Date().getDate();
      // date = new Date(result.dt * 1000).toLocaleDateString();
    });
    afterEach(() => {
      // status.restore();
      // json.restore();
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
      fetch.resolves(true);
      const result = await weatherController.currentWeatherCity(req, res);
      expect(status.calledWith(202)).to.be.true;
      expect(
        json.calledWith({
          location: "Jishnu",
        })
      ).to.be.true;
    });
  });
});
