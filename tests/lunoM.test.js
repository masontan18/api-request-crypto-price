import { fromLunoM } from "../lib/lunoM.js";

beforeEach(() => {
  jest.resetModules(); //reset module mocks before each test (Good practice to put on all test file)
});

//MOCK RESPONSE OBJECT FROM API via global.fetch 
test("Returns the BTCMYR from LUNO if successful", async () => {
  const MOCK_PRICE = 99;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve({ last_trade: MOCK_PRICE }),
    })
  );

  expect(await fromLunoM()).toBe(MOCK_PRICE);
});

test("Returns the Error Message if BTCMYR from LUNO if unsuccessful", async () => {
  const MOCK_PRICE = 99;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 504,
      ok: false,
      json: () => Promise.resolve({ last_trade: MOCK_PRICE }),
    })
  );

  expect(await fromLunoM()).toBe(
    "Something is wrong here (response is not ok)"
  );
});

// so the upper part is called mocking. Sometimes our code could be fine and working but the server providing us the data (server that we send http request to, in this case is LUNO) is down
// To avoid the test failed due to LUNO server down instead of our code got bug, we will mock the response object that is supposed to be sent back by LUNO API (we never use live data for testing)
// const response = await fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR"); We are creating this fake response object "response", read this file together with lunoM.js to see how does the keys work inside!
// The keys named "status" and "ok" can just be either one will do, depends on which one you used to assess the response object is it ok in lunoM.js
