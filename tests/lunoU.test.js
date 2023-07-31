beforeEach(() => {
  jest.resetModules(); //reset module mocks before each test (Good practice to put on all test file)
});

//MOCK ASYNC FUNCTION (resolved value) via jest.fn
test("calculates the Conversion to USD from MYR if successful", async () => {
  const fromLunoU = require("../lib/lunoU.js");
  const lunoM = require("../lib/lunoM.js");
  const fromMyrConvert = require("../lib/myrConvert.js");

  lunoM.fromLunoM = jest.fn().mockResolvedValue(100); //export let works with require(""), same as export require(""), just that using the name declared via let instead of the original function name
  fromMyrConvert.myrConvert = jest.fn().mockResolvedValue(50);

  expect(await fromLunoU.lunoU()).toBe(2);
});

test("calculates the Conversion to USD from MYR if unsuccessful", async () => {
  const fromLunoU = require("../lib/lunoU.js");
  const lunoM = require("../lib/lunoM.js");
  const fromMyrConvert = require("../lib/myrConvert.js");

  lunoM.fromLunoM = jest.fn().mockResolvedValue("hi"); 
  fromMyrConvert.myrConvert = jest.fn().mockResolvedValue(50);

  expect(await fromLunoU.lunoU()).toBe("Something is wrong here (MYR convert to USD)");
});
