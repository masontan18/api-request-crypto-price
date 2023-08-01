// var prompt = require('prompt-sync')();
import promptSync from "prompt-sync";

export async function promptAsk() {
  const prompt = promptSync();
  const crypto = prompt("Enter Crypto: ");
  return crypto; //crypto is the input value
}

// prompt sync third party library to prompt question and get user input
// install the third party library via npm i prompt-sync
// We import this function in 1 file only which is index.js in this case. If you import somewhere else again, the prompt question will come out again even we just using await promptAsk() to retrieve resolved value
// Take note when testing index.js, although we mocked the resolved value of promptAsk, the prompt question still coming out, just let it empty and enter since we already mock the resolved value of promptAsk
// Expecting input like ETH, BTC, XRP those crypto. index.js will get the input value then pass to other functions via parameter so they can get the respective price based on what cryptocurrency enquired
