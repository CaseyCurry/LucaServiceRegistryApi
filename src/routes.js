"use strict";

const wrap = require("express-async-wrap");

const register = (dependencies) => {
  const services = dependencies.services;

  return (app) => {
    app.post("/api/services", wrap(async(request, response) => {
      const serviceName = request.body.name;
      if (services[serviceName]) {
        response.status(409);
        response.end();
        return;
      }
      const port = await services.add(
        serviceName,
        request.query.statusCheckPollDuration);
      response.status(201);
      response.send(port.toString());
      response.end();
    }));

    app.delete("/api/services/:service", wrap(async(request, response) => {
      await services.remove(request.params.service);
      response.status(200);
      response.end();
    }));

    app.get("/api/services/:service", wrap(async(request, response) => {
      const service = services.getByName(request.params.service);
      if (!service) {
        response.status(404);
        response.end();
        return;
      }
      response.status(200);
      response.send(service.port.toString());
      response.end();
    }));

    app.get("/api/services", wrap(async(request, response) => {
      response.status(200);
      response.json(services.getAll());
      response.end();
    }));
  };
};

module.exports.register = register;
