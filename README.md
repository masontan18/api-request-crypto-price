# bootcamp-cryptocurrency-price
Context: For thoses who have used Luno to trade cryptocurrencies, you would notice that you tend to be paying a premium compared to other bigger exchanges during a crypto bull market. Let's write a program to know just exactly how much more expensive Luno users are paying to buy a particular cryptocurrency compared to Binance users in USD terms.

- Retrieve price from Luno and USDMRY exchange rate: Send http requests to respective API
- Retrieve price from Binance: Use a SDK (node-binance-api)
- Use async-await
- Use .env (dotenv)
- All functions tested with JEST
- Refactor done
- Users can interact with the prompt question by input which crypto to see
- Long running process without making requests too frequently via 1.5s delay for next prompt
