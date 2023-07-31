import { add } from "../lib/math";

test("Returns the correct sum value", () => {
  expect(add(1, 2, 3, 4, 5)).toBe(15);
});

//FORMAT in .test.js for unit test and integration test
// test("description of this test", anonymous function or could be anonoymous asdf function storing a phase)
// that phase should be: expect(A).toBe(B:things beind return); meaning to say we are testing a function that supposed to return something only. if that function is not return anything but console.log, we can test also. Refer index.test.js
// We never want to use live data such as data from server (API) or returned value of other function. We will mock this live data into dummy data
// So when we are going to use mock (jest.mock or jest.fn only, excluded global.fetch which is for mocking API response object), we need to use "export" syntax and require("") instead of using "import" syntax, require("") have to be used inside the second parameter of test
// Take note: We can use "export" syntax (same line or separate line) together with require(""), see example in binanceU.test.js and binanceU.js. The require("") is an object storing all the export, declare a new object named to store it and use. We are using this export-require way only in test file where we want to use mock such as jest.mock and jest.fn (the require("") have to be done inside second parameter (function) of test)
// Then we see what we want to mock:
// 1. it can be the response object replied by API (we are not using jest.mock or jest.fn so no need comply with "export" require("")), see lunoM.test.js
// 2. it can be the entire modules replied by third party server such as node-binance-api (SDK), see binanceU.test.js
// 3. it can be resolved value of async function, see priceD.test.js
// can have multiples test inside the second arguement (function), should run the opposite test (what should be showed when error) or testing with different variable

// If A and B is supposed to be the same structure and content but in different memory. for example A is an array [1,2,3] and after function it becomes an new array [1,2,3]. They are the same structure but actually 2 different array (like twins). In this case, we use .toEqual instead of .toBe
// .toEqual will just testing the structure and content is it the same, will ignore the memory (whether they are the same array); .toBe will testing strictly whether they are the same array (in the same memory); So usually after using .toEqual we can use .not.toBe and it supposed passed also because they are same structure but is different array

//SET UP JEST for testing code (work in ES MODULE only)
//Testing code is important. Whenever we want to do something to our appication such modify current functionality, add new functionality, refactor (make it clean, make it a better code) or etc, we need to do testing first so that it won't break the entire application
// npm i --save-dev jest @babel/plugin-transform-modules-commonjs 
// create a file named .babelrc at the root of project directory (not under any folder) and paste the below into it
// {
//   "env": {
//     "test": {
//       "plugins": [
//         "@babel/plugin-transform-modules-commonjs"
//       ]
//     }
//   }
// }
// Check package.json. The "test" key under "scripts" should set to "jest". Meanwhile, please make sure this is a ES MODULE!
// "scripts": {
//     "test": "jest --coverage --watchAll"
// }
// Done set up, lets create folder named "tests" to stored test file, name them exaclty the same file you want to test by adding test such as math.js and math.test.js
// --coverage causing result will show the percentage of file tested (it just take care of the file that being added .test such as math.js if we have only math.test.js). If we see any incomplete test to be done, can go folder "coverage" > choose index.html and run with live server > choose the file that is incomplete and it will show the part that haven't tested yet
// --watchAll causing jest in watch mode, you can use shortcut key to give command to jest (command key shows up after npm test)
// use npm test to run test, then follow commands by --watchAll

//TYPES OF TEST (Which one we write more? Answer: Unit Test > Integration Test > Functional Test)
// 1. Unit Test as what we doing above. It is a fully isolated function just taking input as parameter (We don't have to mock things because we can just test the function with a particular parameter straight away such as add(1,3))
// 2. Integration Test: the function we are testing depends on live data such as result of another function, data from API or third party server (that function not using this live data as parameter, so we cannot simply put a particular parameter to test, have to mock something in this case)
// 3. functional test is test from the perspective of a user such as after clicking the button and what should happen next (the function is not meant to return or console.log something so cannot be tested in unit and integration test)

