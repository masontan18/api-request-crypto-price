
async function lunoM(crypto) {
  let pair = crypto
  if (crypto == "BTC") {
    pair = "XBT"
  }
  const endpoint = "https://api.luno.com/api/1/ticker?pair=" + pair + "MYR"
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.last_trade;
    } else {
      throw "ERROR is here";
    }
  } catch (err) {
    if (err == "ERROR is here") {
      return "Something is wrong here (response is not ok)"; //If the resolved value of this async function is this phase (since it is what being returned), we know the error is at the response object, not when using await fetching API because the error at await fetch API will be multiple lines
    }
    throw err; //by doing this, we want to crash the application once response object cannot be obtained from fetch by throwing a error here to identify the problem here (formula of throwing single line error)
  }
}

//ES Module (using export let)
//want to export lunoM, declare a variable to store (can export as much as you want)
export let fromLunoM = lunoM;

//CommonJS Module (declare a new variable (key) to store the value)
// module.exports.fromLunoM = lunoM
