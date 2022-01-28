const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

require("dotenv").config();
const apiKeyWeather = `${process.env.apiKeyWeather}`;

const fetchLib = require("../library/fetchAPI");

const weatherController = require("../controllers/weatherController");

describe("weatherController", () => {
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

  describe("Getting current Weather by City", () => {
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

  // describe("Getting current Weather by GeoLocation", () => {
  //   it("Not Getting Weather", async () => {
  //     req = {
  //       query: {
  //         latitude: "22.5",
  //         longitude: "80.2",
  //       },
  //     };
  //     fetch.resolves(null);
  //     const result = await weatherController.currentWeatherLatLong(req, res);
  //     expect(status.calledWith(404)).to.be.true;
  //     expect(json.calledWith({ message: "something went wrong" })).to.be.true;
  //   });

  //   it("Getting Weather", async () => {
  //     req = {
  //       query: {
  //         latitude: "22.5",
  //         longitude: "80.2",
  //       },
  //     };

  //     fetch.resolves({
  //       json: () => {
  //         return Promise.resolve({
  //           name: "Jishnu",
  //           main: {
  //             temp: "30",
  //           },
  //           dt: date,
  //         });
  //       },
  //     });

  //     const result = await weatherController.currentWeatherLatLong(req, res);

  //     expect(status.calledWith(202)).to.be.true;
  //     expect(
  //       json.calledWith({
  //         location: "Jishnu",
  //         temperature: "30",
  //         date: new Date(date * 1000).toLocaleDateString(),
  //       })
  //     ).to.be.true;
  //   });

  //   it("Error Happend", async () => {
  //     req = {
  //       query: {
  //         latitude: "22.5",
  //         longitude: "80.2",
  //       },
  //     };

  //     fetch.rejects(new Error("I am an ERROR ^_^"));

  //     const result = await weatherController.currentWeatherCity(req, res);

  //     expect(status.calledWith(464)).to.be.true;
  //     expect(json.calledWith({ message: "I am an ERROR ^_^" })).to.be.true;
  //   });
  // });
});
