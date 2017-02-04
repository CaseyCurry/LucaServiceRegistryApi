"use strict";

const services = (axios, findAPort) => {
  const services = {};

  return {
    add: async(serviceName, statusCheckPollDuration) => {
      const port = await findAPort();
      const registrationTime = new Date()
        .toISOString();
      services[serviceName] = {
        port,
        registrationTime,
        statusCheck: setInterval(async() => {
          try {
            await axios.head(`http://localhost:${port}`);
          } catch (error) {
            if (services[serviceName] &&
              services[serviceName].port == port) {
              clearInterval(services[serviceName].statusCheck);
              delete services[serviceName];
              const removalTime = new Date()
                .toISOString();
              console.log(`${removalTime}: removed ${serviceName}`);
            }
          }
        }, 1000 * (statusCheckPollDuration || 5))
      };
      console.log(`${registrationTime}: added ${serviceName} on port ${port}`);
      return port;
    },
    remove: (serviceName) => {
      if (services[serviceName]) {
        clearInterval(services[serviceName].statusCheck);
        delete services[serviceName];
        const removalTime = new Date()
          .toISOString();
        console.log(`${removalTime}: removed ${serviceName}`);
      }
    },
    getByName: (serviceName) => {
      return services[serviceName];
    },
    getAll: () => {
      return Object.keys(services)
        .map(serviceName => {
          const service = services[serviceName];
          return {
            "name": serviceName,
            "port": service.port,
            "registrationTime": service.registrationTime
          };
        });
    }
  };
};

module.exports = services;
