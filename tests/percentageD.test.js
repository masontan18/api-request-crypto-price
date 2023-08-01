beforeEach(() => {
  jest.resetModules(); //reset module mocks before each test (Good practice to put on all test file)
});

//MOCK ASYNC FUNCTION (resolved value)
test("Calculate the percentage difference between BTCUSD from Luno and Binance if successful", async () => {
  const fromPercentageDifferent = require("../lib/percentageD");
  const fromBinanceU = require("../lib/binanceU");
  const fromPriceDifferent = require("../lib/priceD");

  fromBinanceU.binanceU = jest.fn().mockResolvedValue(100);
  fromPriceDifferent.priceD = jest.fn().mockResolvedValue(10);

  expect(await fromPercentageDifferent.percentageD("BTC")).toBe(10);
});

test("Calculate the percentage difference between BTCUSD from Luno and Binance if unsuccessful", async () => {
  const fromPercentageDifferent = require("../lib/percentageD");
  const fromBinanceU = require("../lib/binanceU");
  const fromPriceDifferent = require("../lib/priceD");

  fromBinanceU.binanceU = jest.fn().mockResolvedValue("Hi");
  fromPriceDifferent.priceD = jest.fn().mockResolvedValue(10);

  expect(await fromPercentageDifferent.percentageD("BTC")).toBe("Something is wrong here (PercentageD)");
});
