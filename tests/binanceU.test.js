// In this case, we are still using the data from server (Binance), but this time we are not using direct API call via fetch(""), we using data from third party server (node-binance-api)
// So we still have to mock the response object in case server down and causing the test failed. Using another formula rather than global.fetch
// We need to mock the entire module (in this case, node-binance-api) in order to mock the response object

// THIS IS WHAT WE GOING TO MOCK (Entire module which is an object)
// import Binance from "node-binance-api";

// Based on the code below, imagine there is a class named Binance used to create an object (like constructor function) and this object containing a key named prices. This "prices" is a promise with resolve value which is an object containing the key named BTCBUSD
// const binance = new Binance()
// let ticker = await binance.prices();
// return ticker.BTCBUSD;

beforeEach(() => {
  jest.resetModules(); //reset module mocks before each test (Good practice to put on all test file)
});

//MOCK MODULE (data from third party server) via jest.mock
test("Returns price if Binance request successful", async () => {
  const MOCK_PRICE = 99;
  const fromBinanceU = require("../lib/binanceU.js");

  // mocking the entire node-binance-api module which is the "binance" declared in binanceU.js
  jest.mock("node-binance-api", () => {
    return class Binance {
      //Binance took from new Binance()
      // we use only the prices method for this particular test, so we'll mock just this method
      prices() {
        return new Promise((res) => {
          res({
            BTCBUSD: MOCK_PRICE,
          });
        });
      }
    };
  });

  expect(await fromBinanceU.binanceU("BTC")).toBe(MOCK_PRICE);
});

test("Returns price if Binance request unsuccessful", async () => {
  const MOCK_VALUE = "Hi";
  const fromBinanceU = require("../lib/binanceU.js");

  // mocking the entire node-binance-api module which is the "binance" declared in binanceU.js
  jest.mock("node-binance-api", () => {
    return class Binance {
      //Binance took from new Binance()
      // we use only the prices method for this particular test, so we'll mock just this method
      prices() {
        return new Promise((res) => {
          res({
            BTCBUSD: MOCK_VALUE,
          });
        });
      }
    };
  });

  expect(await fromBinanceU.binanceU("BTC")).toBe("Something is wrong here (Retrieve price from Binance)");
});
