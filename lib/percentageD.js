import { binanceU } from "./binanceU.js";
// import fromPriceDifferent from "./priceDifferent.js";
import { priceD } from "./priceD.js";

export async function percentageD(crypto) {
  try {
    const fromBinanceU = await binanceU(crypto);
    // const priceDifferent = await fromPriceDifferent.priceD();
    const priceDifferent = await priceD(crypto);
    const difference = (+priceDifferent / +fromBinanceU) * 100
    if (isNaN(difference) === false) {
      return difference
    } else {
      throw "ERROR is here"
    }
  } catch (err) {
    if (err == "ERROR is here") {
      return "Something is wrong here (PercentageD)"
    }
    throw err;
  }
}

// //ES Module (using export default in variable based)
// export default percentageD;
