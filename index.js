//ES MODULE: Using export import syntax via type:module (in <link> within <head> in html file OR in package.json) Or change file name to .mjs > no longer use "require"
import { fromLunoM } from "./lib/lunoM.js"; //using export let (have to import the same variable name as declared in lunoM.js)
import { myrConvert } from "./lib/myrConvert.js"; //using export (separate line)
import { lunoU } from "./lib/lunoU.js"; //using export (separate line)
import { binanceU } from "./lib/binanceU.js"; //using export (same line)
// import fromPriceDifferent from "./lib/priceD.js" //using export default (object based)
import { priceD } from "./lib/priceD.js"; //change to use export due to jest test
// import fromPercentageDifferent from "./lib/percentageD.js" //using export default (variable based)
import { percentageD } from "./lib/percentageD.js"; //change to use export due to jest test
import { promptAsk } from "./lib/promptAsk.js";

//COMMONJS MODULE: (like "export let", use back the { variable name declared } when import; if without {} then it is a new object to store the entire export object, refer to desktop/JS/module1.js)
// const {fromLunoM} = require("./lunoM.js")
// const {fromMyrConvert} = require("./myrConvert.js")
// const {fromLunoU} = require("./lunoU.js")

export async function result() {
  const pairList = ["BTC", "XRP", "ETH", "ADA", "SOL", "LTC", "BCH", "LINK", "AVAX", "UNI"];
  try {
    const crypto = await promptAsk();

    if (pairList.includes(crypto)) {
      const lunoM = await fromLunoM(crypto);
      const convertMyr = await myrConvert();
      const uLuno = await lunoU(crypto);
      const fromBinanceU = await binanceU(crypto);
      // const priceDifferent = await fromPriceDifferent.priceD();
      const priceDifferent = await priceD(crypto);
      // const percentageDifferent = await fromPercentageDifferent();
      const percentageDifferent = await percentageD(crypto);

      const contentLm = crypto + "MYR price on Luno:"
      const contentForex = "USDMYR:"
      const contentLu = crypto + "USD price on Luno:"
      const contentBu = crypto + "BUSD price on Binance:"
      const contentPriceD = "Price Difference:"
      const contentPerD = "Luno Premium:"

      console.log(contentLm.padEnd(30, " ") + "MYR " + lunoM);
      console.log(contentForex.padEnd(30, " ") + convertMyr);
      console.log(contentLu.padEnd(30, " ") + "USD " + uLuno);
      console.log(contentBu.padEnd(30, " ") + "USD " + fromBinanceU);
      console.log(contentPriceD.padEnd(30, " ") + "USD " + priceDifferent);
      console.log(contentPerD.padEnd(30, " ") + percentageDifferent.toFixed(4) + "%");
      setTimeout(result,1500); //make it a long running process, prompt out again after 1.5s
    } else {
      console.log("Sorry, please try again with one of the following: BTC, XRP, ETH, ADA, SOL, LTC, BCH, LINK, AVAX, UNI");
      setTimeout(result,1500);
    }
    
  } catch (err) {
    console.log(err);
  }
}
result();

//Summary
//1. See ES module vs CommonJS module differences in terms of syntax used for export and import file
//To standardize, we always use ES module (export and import syntax but go thru CommonJs module also), we can use few ways
//"export default" the value straight away (within {} is object based); can declare a new variable (new object for object based) name when import (only 1 export default can be written per file)
//"export let" is straight away declare a new variable to store the value; use back that { variable name declared } when import
//"export" the value straight away, separate line then within {}, same line then "export" before the variable/function to be exported ; Both way also use back that { variable name declared } when import
//try to use more "export" will do
// Take note: We can use "export" syntax (same line or separate line) together with require(""), see example in binanceU.test.js and binanceU.js. The require("") is an object storing all the export, declare a new object named to store it and use. We are using this export-require way only in test file where we want to use mock such as jest.mock and jest.fn (the require("") have to be done inside second parameter (function) of test)

//2. See how async function works with API. API request takes time so always put it in asynchronous way which is inside async function. Understanding of API fetch workflow as mentioned in https.js. The problem now is how to retrieve that API content in other js file because that API content lives in an async function
//2.1 Lets see example in lunoM, the content we want may not the entire jsonResponse (object), may be just jsonResponse.ask which refering to a figure such as "13401". In this case, we can just return jsonResponse.ask so this jsonResponse.ask becomes the resolve value of lunoM() as remember async function always return a promise
//2,2 Import lunoM() to file which is index.js where we want to use this jsonResponse.ask (figure) via ES module way or CommonJs module way. How to retreive this jsonResponse.ask in index.js? Since lunoM is a async function, we cannot simply console.log(fromLunoM()) to get its value as it will show a pending promise. Have to use await method inside async function, remember await got the special features to stop the codes after it from running till it finished
