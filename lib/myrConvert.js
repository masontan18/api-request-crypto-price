// const dotenv = require("dotenv")
// dotenv.config();
import dotenv from "dotenv";
dotenv.config();

async function myrConvert() {
  let myHeaders = new Headers();
  myHeaders.append(process.env.YOUR_NAME, process.env.API_KEY);

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      "https://api.apilayer.com/exchangerates_data/convert?to=MYR&from=USD&amount=1",
      requestOptions
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.result;
    } else {
      throw "ERROR is here";
    }
  } catch (err) {
    if (err == "ERROR is here") {
      return "Something is wrong here (response is not ok)";
    }
    throw err;
  }
}
//ES Module (using export, separate line)
export { myrConvert };

//CommonJS Module
// module.exports.fromMyrConvert = myrConvert
