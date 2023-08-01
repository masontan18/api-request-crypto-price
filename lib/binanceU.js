// const Binance = require("node-binance-api");
import Binance from "node-binance-api";

const binance = new Binance();
export async function binanceU(crypto) {
  
  try {
    let ticker = await binance.prices();
    if (isNaN(ticker[`${crypto}BUSD`]) === false) {
      return ticker[`${crypto}BUSD`];
    } else {
      throw "ERROR is here";
    }
  } catch (err) {
    if (err == "ERROR is here") {
      return "Something is wrong here (Retrieve price from Binance)";
    }
    throw err;
  }
}

binanceU()


