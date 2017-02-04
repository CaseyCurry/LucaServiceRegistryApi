"use strict";

const axios = require("axios");
const portscanner = require("portscanner");
const findAPort = require("./find-a-port")(portscanner);
const services = require("./services")(axios, findAPort);

const dependencies = {
  services
};

module.exports = dependencies;
