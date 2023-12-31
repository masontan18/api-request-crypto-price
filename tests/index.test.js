beforeEach(() => {
  jest.resetModules(); //reset module mocks before each test (Good practice to put on all test file)
});

//MOCK ASYNC FUNCTION (resolved value); The function not meant to return something but console.log
test("Check the console result", async () => {
  const main = require("../index.js");
  const lunoM = require("../lib/lunoM.js");
  const fromMyrConvert = require("../lib/myrConvert.js");
  const fromLunoU = require("../lib/lunoU.js");
  const fromBinanceU = require("../lib/binanceU.js");
  const fromPriceD = require("../lib/priceD.js");
  const fromPercentageD = require("../lib/percentageD.js");
  const fromPromptAsk = require("../lib/promptAsk.js")

  const MOCK_CRYPTO = "BTC"
  fromPromptAsk.promptAsk = jest.fn().mockResolvedValue(MOCK_CRYPTO)

  const MOCK_LUNOM = 100000;
  lunoM.fromLunoM = jest.fn().mockResolvedValue(MOCK_LUNOM);

  const MOCK_RATE = 4;
  fromMyrConvert.myrConvert = jest.fn().mockResolvedValue(MOCK_RATE);

  const MOCK_LUNOU = 25000;
  fromLunoU.lunoU = jest.fn().mockResolvedValue(MOCK_LUNOU);

  const MOCK_BINANCEU = 20000;
  fromBinanceU.binanceU = jest.fn().mockResolvedValue(MOCK_BINANCEU);

  const MOCK_PRICED = 5000;
  fromPriceD.priceD = jest.fn().mockResolvedValue(MOCK_PRICED);

  const MOCK_PERCENTAGED = 20;
  fromPercentageD.percentageD = jest.fn().mockResolvedValue(MOCK_PERCENTAGED);

  console.log = jest.fn(() => undefined); //replaces the real console.log implementation with a mock function that does nothing (returns undefined).
  // The purpose of this mock is to track if and how the console.log method is called during the test, without actually logging anything to the console.

  await main.result(); //call the tested function which is result from index.js

  const contentLm = MOCK_CRYPTO + "MYR price on Luno:"
  const contentForex = "USDMYR:"
  const contentLu = MOCK_CRYPTO + "USD price on Luno:"
  const contentBu = MOCK_CRYPTO + "BUSD price on Binance:"
  const contentPriceD = "Price Difference:"
  const contentPerD = "Luno Premium:"

  expect(console.log).toHaveBeenCalledWith(contentLm.padEnd(30, " ") + "MYR " + MOCK_LUNOM); //This is the test assertion. It uses expect from Jest
  // to verify that the console.log method was called with the expected message as an argument.
  expect(console.log).toHaveBeenCalledWith(contentForex.padEnd(30, " ") + MOCK_RATE);
  expect(console.log).toHaveBeenCalledWith(contentLu.padEnd(30, " ") + "USD " + MOCK_LUNOU);
  expect(console.log).toHaveBeenCalledWith(contentBu.padEnd(30, " ") + "USD " + MOCK_BINANCEU);
  expect(console.log).toHaveBeenCalledWith(contentPriceD.padEnd(30, " ") + "USD " + MOCK_PRICED);
  expect(console.log).toHaveBeenCalledWith(contentPerD.padEnd(30, " ") + MOCK_PERCENTAGED.toFixed(4) + "%");
});

//The test assertion checks whether console.log was called with this specific message. If the lunoResult function logs the expected message to the console when executed,
// the test will pass. This way, the test ensures that the function is correctly interacting with the console.log method as intended.
