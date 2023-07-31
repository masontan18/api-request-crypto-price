//refer to priceDifferent.js, we don't want to use the live data from lunoU.js and binanceU.js so lets mock their resolved value to dummy value!

beforeEach(() => {
  jest.resetModules(); //reset module mocks before each test (Good practice to put on all test file)
});

//MOCK ASYNC FUNCTION (resolved value) via jest.fn
test("calculates the dollar difference between BTCUSD from Luno and Binance if successful", async () => {
  const fromPriceDifferent = require("../lib/priceD");
  const fromLunoU = require("../lib/lunoU");
  const fromBinanceU = require("../lib/binanceU");

  fromLunoU.lunoU = jest.fn().mockResolvedValue(100);
  fromBinanceU.binanceU = jest.fn().mockResolvedValue(70);

  expect(await fromPriceDifferent.priceD()).toBe(30);
});

test("calculates the dollar difference between BTCUSD from Luno and Binance if unsuccessful", async () => {
  const fromPriceDifferent = require("../lib/priceD");
  const fromLunoU = require("../lib/lunoU");
  const fromBinanceU = require("../lib/binanceU");

  fromLunoU.lunoU = jest.fn().mockResolvedValue("Hi");
  fromBinanceU.binanceU = jest.fn().mockResolvedValue(70);

  expect(await fromPriceDifferent.priceD()).toBe("Something is wrong here (PriceD)");
});
