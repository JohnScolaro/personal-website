---
title: "How to make money on the ByBit Testnet"
description: "An article listing a number of tips for how to make money on the ByBit testnet, and some quirks of this specific test exchange."
date: "2025-07-19"
tags: ["Cryptocurrency", "Trading"]
---

At the time of writing, [ByBit](https://www.bybit.com/) is the second largest cryptocurrency exchange in the world by volume. You can deposit your hard earned cash, and trade it for visionary digital currencies like [Dogecoin](https://en.wikipedia.org/wiki/Dogecoin), or speculate on risky Fartcoin derivative products![^1]

![Just a simple image of the ByBit logo](/images/blog/how-to-make-money-on-the-bybit-testnet/bybit-logo.png)

<figcaption class="mt-2 text-sm text-gray-500 italic text-center">
ByBit's Exquisite Logo.
</figcaption>
  
But I didn't write this to ramble about the value of cryptocurrency in today's world, I wrote it to talk about the ByBit testnet. In the following post, I will explain some fairly reliable ways to make money on the testnet. I'll also mention some safety features of the exchange, and how they result in some interesting looking charts.

## What is the ByBit Testnet?

The ByBit Testnet is basically a carbon-copy of ByBit, located at their [testnet domain](https://testnet.bybit.com/en/)! On the testnet, you can't deposit or withdraw real money, but instead you click a magic button once a day, and receive 1 free testnet-bitcoin, and 10,000 free testnet-USDT to trade with! The money is made up, and the points don't matter!

![A meme I made from a scene of "Whose line is it anyway" because their famous line is that it's a show "Where the rules are made up and the points don't matter", and that's sorta like the ByBit testnet!](/images/blog/how-to-make-money-on-the-bybit-testnet/whose-line-meme.png)

## Why does the ByBit Testnet exist?

The testnet is a great idea for a number of reasons:

- ByBit can deploy new code on the test exchange, so their matching engines can match millions of dollars of fake volume and test it for bugs before rolling it out to production.
- Traders who develop bots can test their bots using fake money before deploying them with real money!

I'd argue there are other under-rated reasons why you might want to use the testnet, even if you're not developing a bot:

- You want to learn how trading crypto perpetual derivatives on margin works, and gain an intuitive understanding without risking real money.
- It's kinda fun? 🤷‍♂️

And that's as good an excuse as anyone needs!

## How to make money on the ByBit Testnet

Making money on the ByBit testnet is fun, but if you're developing a trading bot it's also very useful. You can receive ~$110,000 in fake funds each day, but the minimum Bitcoin derivative order is ~$200, so if your bot breaks or trades poorly, or if the price spikes/drops and get liquidated, you can run out rather quickly, and you don't want a lack of testnet funds to halt your development. Here are my strategies to keep your account balance high, in order of easiest to hardest.

### 1. Click the Free Money button.

![A screenshot from Spongebob, of Patrick giving away a big bag of cash under a stand titled: "Free Money". Patrick has been labelled "Bybit Testnet".](/images/blog/how-to-make-money-on-the-bybit-testnet/free-money.png)

The ByBit User Interface is horribly unintuitive, but ByBit themself attempt to explain how to collect your test coins [here](https://www.bybit.com/en/help-center/article/How-to-Request-Test-Coins-on-Testnet). I just want to add that you can only collect these coins on your main account, so you can't create multiple sub-accounts and request coins on each of them.

### 2. Farm perpetual contract funding rates.

If you're not familiar with perpetual futures, pause here and read up on them, otherwise this paragraph will be complete gibberish.

Perpetual futures (or perps) rely on a funding rate mechanism to keep the price of the future in line with the price of the underlying asset. If the contract is trading above the value of the _index_ price, every few hours (varying by token) long position holders have to pay short position holders. This creates an incentive to push the price of the perp towards the index price, because you're literally getting paid to do so. In real markets, the index price is a combination of the prices of coins on several different exchanges, as to not be overly reliant on the price from any one exchange.

ByBit's testnet uses the same index price as production. This _should_ keep the price of the testnet perp aligned with the real price of the coin, but in practice it _rarely_ is. This creates a lot of opportunities to collect the funding rate payments. The strategy is simple:

- Sell perps trading significantly above their index price, or
- Buy perps trading significantly below their index price.

On real exchanges even the most marginal of these opportunities are snatched up instantly by bots, so you'll never be able to do something this obvious on the real exchange. On the testnet however they're not too hard to find. For example, the first ticker I looked at (AAVE/USDT) looks like this:

![A chart showing the price on the testnet of the AAVE token in the last day.](/images/blog/how-to-make-money-on-the-bybit-testnet/aave-last-day.png)

<figcaption class="mt-2 text-sm text-gray-500 italic text-center">
Nobody has ever accused ByBit of having a simple mobile UI. My condolences if you’re squinting at this on a mobile.
</figcaption>

If you zoom in on this chart, you can see it's currently trading for $243, and the index price is $326. We can purchase over $10 million USDT worth of AAVE, and not push the price above $260. Simply scoop up the $10 million dollars of AAVE, stick a limit order in to sell it all at $300, and kick back and relax as you pull down 0.58% of the mark price every 8 hours. If the price stays around $260, that's over $150,000 per day. So you're already making more than clicking the free money button.

If you want to go over the math for how the [funding rate](https://www.bybit.com/en/help-center/article/Introduction-to-Funding-Rate) or the [funding fee](https://www.bybit.com/en/help-center/article/Funding-fee-calculation) are calculated, these links are your friend.

Of course, nothing is free. There are two ways this can backfire:

1. **The index price of AAVE drops** - If AAVE drops 40% and is lower than the ~260 dollars you paid for it, you'll stop collecting the funding rate. This _could_ happen, but since the index price of the coin is the real value of the coin, the chance it drops 50% in a day is very small.

2. **The price of the perp drops** - If the price of the perp continues to drop down to almost zero, you could get liquidated on your position. Since this is the testnet, this actually could happen. Zoom all the way out on the chart and see if it's happened in the past. Here is the chart for AAVE for most of 2025.

![A Chart showing the AAVE price for most of the last year. You can see that it pretty much oscillates around the index price.](/images/blog/how-to-make-money-on-the-bybit-testnet/aave-historic.png)

You can see it tends to oscillate around the index price, so you can reasonably expect to not have this happen.

This is a low risk, and low maintenance method for making consistent gains on testnet.

### 3. Buy low and sell high during wild liquidations.

The ETH/USDT perp and BTC/USDT perp are the worst offenders for having wild price swings. Moves like this happen almost every day for BTC and ETH:

![A Chart showing the BTC price crater, and then skyrocket in the space of ~4 hours.](/images/blog/how-to-make-money-on-the-bybit-testnet/bitcoin-liquidations.png)

As you can see here, the price jumped from $10,000 to $200,000 in about 4 hours. The play here is simple. When the price moves significantly away from the index price, buy low and sell high!

This can be very lucrative, but also very dangerous.

What will the price stop dumping at? 30k? 10k? 1k? You don't want to load yourself up with millions of dollars of bitcoins on leverage, and then the price continues to dump and you get liquidated. I recommend loading up with as much as you can, at very low leverage.

### 4. Find someone testing a bot and abuse it.

In real life, thousands of bots are trading constantly, all with different strategies.

On the testnet you are often able to see the exact moment someone turns a bot on and off. Usually it's obvious because the price starts actually changing, and the volume traded jumps orders of magnitude. It might look something like this:

![A Chart showing the volume of a random coin skyrocket for a few hours.](/images/blog/how-to-make-money-on-the-bybit-testnet/volume-spike.png)

It's not really worth looking for these opportunities, but if you stumble upon one, it's fun to put large and tight buy/sell orders in and collect the spread as the bot bounces between them. You can make millions very quickly, but it requires very active management and isn't really a good use of your time. (Plus, if this actually is some poor soul testing a bot, you're ruining their day).

## Quirks of the ByBit Testnet exchange, and issues you might run into.

While fiddling around on ByBit testnet frontend, there were a few unexplained issues I slowly figured out. My goal is to list these, so anyone new coming to the exchange can just read this list to answer some of their questions.

### 1. The website is broken!

ByBit tests changes on the testnet regularly. Often multiple times a day certain pages won't load, or the UI will be broken. This is just something you'll have to deal with, but I've found that if something is broken for Chrome, often it'll work on Firefox and vice-versa. Before complaining there is nothing you can do, switch your browser and try again.

### 2. I can't buy bitcoin!

You might have attempted to buy spot bitcoin through the web UI and have it fail with a message like this:

![A screenshot of a confusing ByBit message ](/images/blog/how-to-make-money-on-the-bybit-testnet/spot-not-filled-error.png)

Err, what?

![The classic "Task Failed Successfully" windows dialogue box that people share online.](/images/blog/how-to-make-money-on-the-bybit-testnet/task-failed-successfully.png)

<figcaption class="mt-2 text-sm text-gray-500 italic text-center">
It's giving very "task failed successfully" vibes.
</figcaption>

The ByBit web UI doesn't tell you what's happening here, but the API does. Your order is outside the price limits for the coin you're trying to buy/sell. For spot trading, ByBit sets price limits for the price you're allowed to pay for tokens. You can see the calculations for these limits spelt out [here](https://www.bybit.com/en/help-center/article/Bybit-Spot-Trading-Rules#A). Essentially you're capped to [some percentage](https://testnet.bybit.com/en/announcement-info/spot-trading-rules/) (which varies by coin) above and below the real _index price_ of the token! So trading spot on the testnet is a little difficult because the price is often at these limits.

While this is annoying, the silver lining is that it's helpful for testing bot edge cases.

### 3. Huge Liquidations

Wild price swings are expected on the testnet. But one type swing deserves some attention. Let's refer back to a chart I showed earler:

![A Chart showing the BTC price crater, and then skyrocket in the space of ~4 hours.](/images/blog/how-to-make-money-on-the-bybit-testnet/bitcoin-liquidations.png)

At first glance, these "sawtooth" spikes might appear to be someone testing a trading bot, but that's not what's happening. This is a massive wave of liquidations. "But wouldn't a giant liquidation cause an instantaneous price crash?" you might ask? Not on ByBit, because of their [perp price limits](https://www.bybit.com/en/help-center/article/Derivatives-Trading-Rules), designed to protect you from market manipulation!

⚠️ Warning ⚠️ Math Zone Ahead ⚠️

I've copied the equations for the min and max orders prices below:

```
Highest Bid = min(
    max(Index Price, Mark Price × (1 + X%)),
    Mark Price × (1 + Y%)
)

Lowest Ask = max(
    min(Index Price, Mark Price × (1 - X%)),
    Mark Price × (1 - Y%)
)
```

The values of X and Y vary by token, and can be found at the following links for [production](https://www.bybit.com/en/announcement-info/transact-parameters/) and the [testnet](https://testnet.bybit.com/en/announcement-info/transact-parameters/), or can be queried directly from their API.

What's important to note is that bid and ask prices are limited to within a certain percentage of the **mark price**. The mark price has [it's own calculation](https://www.bybit.com/en/help-center/article/Mark-Price-Calculation-Perpetual-Contracts) but can be thought of as a smoothed price over ~5 minutes. This means that the prices on the exchange can't change faster than some percentage every 5 minutes, and this results in these exponential-looking decays and spikes.

So if you attempt to sell during a plunge and your order is rejected, it's because all the bids in the book are below the limit.

### 4. Margin risk limits.

Perhaps counterintuitively, the largest purchases don't use margin on the testnet. You've probably heard the saying:

> If you owe the bank $100 that's your problem. If you owe the bank $100 million, that's the bank's problem.

Well if you read and understand ByBit's rules on [margin limits for different positions](https://www.bybit.com/en/help-center/article/Risk-Limit-Perpetual-and-Futures), you'll see that ByBit has a similar problem.

If you want to use $100 to buy $10,000 of Bitcoin using 100x leverage. That's fine. A small drop in the bucket for ByBit and they'll enjoy the fees you pay.

If you want to use $10 million to buy $1 billion dollars of Bitcoin using 100x leverage, well, you could do some serious damage.

ByBit doesn't want this, and so the larger your intended position becomes, the lower the leverage you can use. As your account starts to balloon in value, you might notice that you hit these limits, and can no longer buy more tokens, despite having the money in your account. Lower your leverage to 1x and you should be able to purchase more.

---

[^1]: ByBit actually _only_ offers fartcoin derivatives, you can't just purchase fartcoin. That would be too simple.
