"use strict";

const expect = require("chai")
  .expect;
const axios = require("axios");
const AxiosMockAdapter = require("axios-mock-adapter");

describe("services test suite", () => {
  describe("unit test suite", () => {
    let mockApi;
    let services;
    const unusedPort = 1;
    const findAPort = async() => {
      return unusedPort;
    };

    beforeEach(() => {
      mockApi = new AxiosMockAdapter(axios);
      mockApi
        .onAny()
        .reply(404);
      services = require("./services")(axios, findAPort);
    });

    afterEach(() => {
      mockApi.restore();
    });

    describe("add test suite", async() => {
      const serviceName = "serviceName";
      const statusCheckPollDuration = .0001;
      let port;

      beforeEach(async() => {
        port = await services.add(serviceName, statusCheckPollDuration);
      });

      it("should add a service", () => {
        const service = services.getByName(serviceName);
        expect(service.port)
          .to
          .equal(port);
      });

      it("should return a port", () => {
        expect(port)
          .to
          .equal(unusedPort);
      });
    });

    it("should get a service by it's name", async() => {
      const serviceName = "serviceName";
      const statusCheckPollDuration = .0001;
      await services.add(serviceName, statusCheckPollDuration);
      const service = services.getByName(serviceName);
      expect(service)
        .to
        .be
        .ok;
    });

    it("should get all services", async() => {
      const serviceName = "serviceName";
      const statusCheckPollDuration = .0001;
      await services.add(serviceName, statusCheckPollDuration);
      const servicesReturned = services.getAll();
      expect(servicesReturned.length)
        .to
        .be
        .above(0);
    });

    it("should remove a service", async() => {
      const serviceName = "serviceName";
      const statusCheckPollDuration = .0001;
      await services.add(serviceName, statusCheckPollDuration);
      await services.remove(serviceName);
      const service = services.getByName(serviceName);
      expect(service)
        .not
        .to
        .be
        .ok;
    });
  });
});
