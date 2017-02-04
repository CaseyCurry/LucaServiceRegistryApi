const expect = require("chai")
  .expect;
const findAPort = require("./find-a-port");

describe("find a port test suite", () => {
  describe("unit test suite", () => {
    it("should find a port greater than or equal to the minimum", async() => {
      const minimumPort = 12002;
      const portscanner = {
        findAPortNotInUse: (minimumPort) => {
          return minimumPort;
        }
      };
      const port = await findAPort(portscanner)();
      expect(port >= minimumPort)
        .to
        .be
        .true;
    });
  });
});
