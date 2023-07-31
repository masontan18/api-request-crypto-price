import { myrConvert } from "../lib/myrConvert";

beforeEach(() => {
  jest.resetModules(); //reset module mocks before each test (Good practice to put on all test file)
});

//MOCK RESPONSE OBJECT FROM API 
test("Returns the USD/MYR conversion rate if successful", async () => {
  const MOCK_CONVERT = 4.5;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve({ result: MOCK_CONVERT }),
    })
  );
  expect(await myrConvert()).toBe(MOCK_CONVERT);
});

test("Returns the Error Message if USD/MYR from ApiLayer if unsuccessful", async () => {
  const MOCK_CONVERT = 4.5;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 504,
      ok: false,
      json: () => Promise.resolve({ result: MOCK_CONVERT }),
    })
  );
  expect(await myrConvert()).toBe(
    "Something is wrong here (response is not ok)"
  );
});
