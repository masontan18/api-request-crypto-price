import { fromLunoM } from "./lunoM.js";
import { myrConvert } from "./myrConvert.js";

async function lunoU(crypto) {
  try {
    const lunoM = await fromLunoM(crypto);
    const fromMyrConvert = await myrConvert();
    const convertedLunoU = +lunoM / +fromMyrConvert;

    if (isNaN(convertedLunoU) === false) { //isNaN is a built-in function that return boolean value only (check is it NaN)
      return convertedLunoU;
    } else {
      throw "ERROR is here";
    }
  } catch (err) {
    if (err == "ERROR is here") {
      return "Something is wrong here (MYR convert to USD)";
    }
    throw err;
  }
}

//ES Module: export (separate line)
export { lunoU };

//CommonJS Module
// module.exports.fromLunoU = lunoU
