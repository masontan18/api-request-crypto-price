import { lunoU } from "./lunoU.js";
import { binanceU } from "./binanceU.js";

export async function priceD() {
  try {
    const uLuno = await lunoU(); //retrieve the resolved value of async function via await (remember async function return a promise and resolved value depends on what being returned)
    const fromBinanceU = await binanceU();
    const difference = Math.abs(+uLuno - +fromBinanceU);
    if (isNaN(difference) === false) {
      return difference;
    } else {
      throw "ERROR is here";
    }
  } catch (err) {
    if (err == "ERROR is here") {
      return "Something is wrong here (PriceD)";
    }
    throw err;
  }
}

//ES Module (using export default in object based)
// export default { priceD };
