// var prompt = require('prompt-sync')();
import promptSync from "prompt-sync";

export async function promptAsk() {
  const prompt = promptSync();
  const crypto = prompt("Enter Crypto: ");
  return crypto; //crypto is the input value
}

// prompt sync third party library to prompt question and get user input
// install the third party library via npm i prompt-sync
// We import this function in 1 file only which is index.js in this case. If you import somewhere else again, the prompt question will keep come out again because using await promptAsk() is calling the function and thus keep run the promt("Enter Crypto:) whenever we import somewhere else and use await
// Take note when testing index.js, although we mocked the resolved value of promptAsk, the prompt question still coming out, just let it empty and enter since we already mock the resolved value of promptAsk
// Expecting input like ETH, BTC, XRP those crypto. index.js will get the input value then pass to other functions via parameter so they can get the respective price based on what cryptocurrency enquired

