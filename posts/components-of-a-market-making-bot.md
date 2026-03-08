---
title: "Components of a Market Making Bot"
description: "One way to compose a number of components to create a trading bot"
date: "2026-03-02"
tags: ["Trading", "Programming"]
---

## Introduction

I love software development. One of my favourite parts of building any somewhat large and complex blob of software is breaking the problem, with all of its complexity and requirements, into a bunch of smaller simple parts that work harmoniously together.

Knowing when to create a new component is sometimes clear and obvious. Other times it's hard and nigh-impossible to see without attempting to solve the problem first. Defining the 'scope' of a component - the 'bounds' of its interface - is like trying to define borders between countries on a map. Sometimes, as with Australia's border, it's relatively simple: "The whole island is one country!". But sometimes components are complex, and responsibilities blur between them, sparking endless debate about what should belong to what, more like the borders of India and Bangladesh.

Components often start simple, and grow and grow until they birth many more components that perform functionality whose necessity slowly reveals itself as niche edge-cases appear.

I enjoy thinking about the best way to separate things, because a loosely-coupled system lowers the cognitive load of working on a component and _makes life easier_. I also like to share how I compose these components (as I did in [this](/blog/pygame-match-3) post), because if you have an idea of the components required to solve a problem, that's a significant amount of the problem already solved.

## A Market Maker Bot

One system I wrestled with all 2025 was a market making bot. I'm going to assume knowledge of [limit order books](https://en.wikipedia.org/wiki/Central_limit_order_book) for the rest of this piece, so if you don't know what they are, read up on them. In a nutshell, a market making bot is a computer program that can quickly post many limit orders in an order book so if people want to buy or sell something on an exchange, there is a seller/buyer waiting for them! How convenient! The reason someone might want to do this is because if you sell potatoes at $11 and buy them at $10, you can make a small profit from the difference in prices. Also, exchange fees are significantly smaller for maker orders than for taker orders - sometimes they're even negative! - so if you're looking to move into a position, it is more cost effective to use maker orders instead of taker orders.

In practice this "market making" is anything but simple, and "what price should something be?" is an unsolvable problem that has nerd-sniped millions of smart people throughout history, whose time may have potentially been better spent doing something else.

Additionally, since "trading" is a zero sum game, and there is only so much volume for market makers to compete for, nobody in the market making business ever spills the beans on the best way to do things. If you're doing something smart and it's making money, you don't share how you're doing it, otherwise your competition will copy you and you won't make money any more! Consequently, it feels like there is more secrecy in the trading industry than all others and I think that's a real shame.

I'm going to share a map of some of our components anyway. For a few reasons:

- Maybe someone smarter than me can look at it and say: "Wow that's a horrible idea, you should do X instead", and I can learn from it.
- Maybe it will accelerate the progress of someone creating a similar system.
- It's simply a place to explain something I made, so when I return to it in 5 years, I'll remember what I built in 2025.
- Maybe even just some of the language used might be useful for readers.
- If you think that making a market making bot might be a fun and simple side-project, this might change your mind.

So with that out of the way, let's get on with the show:

## The Components

I'm a visual learner, so here is a diagram showing a bunch of components, and arrows between them showing "data flow".

![A draw.io diagram with a whole bunch of boxes and arrows between them.](/images/blog/components-of-a-market-making-bot/trading_components.png)

Now let's explore the roles and responsibilities of these components one-by-one!

### The Engine

The largest component of all, the "engine", is the giant component that contains all other components. The jobs of the engine are:

- Plumb data between all components.
- Deal with initialisation.
- Sit in an infinite loop pumping data through components and trading.
- Gracefully handle shutdowns, reboots, and internal errors from components.

Initialisation alone is hard. You don't want to start placing orders before you can calculate the price you want to quote at. You might only know that price when you've connected to internal services and received your balances, limits, current prices, current volatility, etc, etc, etc. Initialisation will most likely have a critical order in which it occurs, because different components rely on others. These dependencies form a sort of graph!

It's also important to gracefully handle exceptions. Because there _will_ be exceptions, and you should restart gracefully and send logs to wherever your logs are stored so they can be carefully analysed at a later date.

Now that I've talked about the engine, I've decided a sensible order to attack the remaining components is from left to right. These components will tell the tale of "how to calculate a price to quote at". I will leave the egress gateway and breakers till last.

### Reference Pricer

A reference pricer is a module that gives you a price of some pair. For example, BTC:USDT = $100,000. How it gets this though, that'll depend on how you decide to do it! Here are some ideas for different _types_ of ReferencePricers:

- Just get the midpoint from Binance
- Maybe average the traded prices from a number of exchanges
- Something fancy with AI!

The two objectives of this module are:

1: Give you a price.
2: Be generic so it can be swapped out easily.

### Price Graph

The job of the price graph is to:

- Hold a graph. The nodes of the graph represent assets like USD, and BTC. The edges between nodes represent prices on an exchange. There might be multiple edges between the same two nodes.
- Allow the updating of asset prices.
- Support querying of paths between assets in the graph, with multiple hops between them.
- Be exceptionally efficient.

### Market Pricer

The job of the market pricer is to calculate the price of an asset in units of another asset. BTC in units of USDT for example. It might seem like a good idea to build this into the price graph at first glance, but there are many different ways calculate a market price. Do you prioritise prices from one exchange? Average them together? Something fancy with AI? Keeping the market pricer away from the price graph allows it to be tested, optimised, and swapped out separate to the price graph.

It's also critical that this run as fast as possible. You're going to be re-calculating the price you're interested in, every time any price changes. This can easily be many hundreds of times each second so you're going to want to benchmark and optimise it.

### Perp Parameters

If you're market making any sort of cryptocurrency, you're probably trading perpetual futures (perps) as well as spot. After all, why trade bitcoin when we can trade pretend bitcoin with extra math to make life harder! As such, you're going to want another module that can use the price graph to calculate important information about these contracts like the basis and index offset. If you want to make funding rate trades, or react to events like exchanges exploding, you'll want access to these features.

### Quote Model Manager

The jobs of the quote model manager are:

- Be a container for all the quote models, simplifying sending and retrieving data from all of them at once.
- Calculate and set the target prices and quantities of the quotes.
- Provide simple functions to cancel all bids and asks.

You might have different quote model managers that set different prices and quantities. For example you may want:

- 3 bids and 3 asks, each with a value of $10.
- 3 bids and 3 asks, but the tightest levels have a value of $5, and the further back you are, the larger the orders get.

### Quote Model

The "Quote Model" is a state machine that manages the state of a single quote. It receives generic messages from the ingress gateway, and sends generic messages to egress gateway.

Examples of generic messages you could receive:

- Your quote has been filled.
- Your cancel has been accepted.
- Your insert has failed with error message X.
- You've been rate limited.

Examples of generic messages you could send:

- Insert an order of quantity Y at price X.
- Modify quantity Z of order A.
- Cancel order A.
- Cancel all orders.

This is the heart of the trading engine where "what you could do" is decided. Consequently there are a bunch of fun design decisions that are made here. Things like:

- If a price is changed, could we cancel and insert, or should we amend?
- How many messages are allowed in-flight for a single quote at a time?
- If we want to modify existing orders to prices outside of the exchanges safety limits, we need to cancel them instead of modifying. (Notice that this is exchange specific logic in a component designed specifically not to be exchange specific. An interesting problem.)

Obviously it's important that this component perform correctly, but also the messaging protocol between the quote model and the ingress gateway is very important too. Different exchanges have different intricacies, and if you can make the quote model generic to work for as many as possible, that'll save a lot of work.

This component also manages the difference between "target" prices, and actual acceptable prices. Limit order books have both minimum tick sizes and minimum lot sizes. This means if your target price is $12.345, but the exchange only accepts orders at $12.34 and $12.35, you'll have to decide which of these to quote at.

_Another_ duty of this component is to manage how closely the target price should be followed. How far should the current price deviate from the target price before you change the price of the order? The lower the allowed deviation, the more accurate your prices are, and the less chance you'll get picked off. But you'll send more messages, exhausting your rate limit which _increases_ your chances of getting picked off when it actually matters! Another tough problem!

Also it's important that this component be fast, because if you want to quote 3 levels on each side of a price, you'll need 6 separate state machines!

### Egress Gateway

This is where your exchange specific implementations of your custom gateway protocol will live. For each exchange you want to communicate with, you'll have to create, test, and wrestle any exchange-specific quirks into another egress gateway implementing your generic messaging interface.

### Spread Model

The spread model is the first component that doesn't tightly lie in the critical path of the trading application. If you're market making, you're quoting on both sides of the price, and the difference between your buy and sell prices is the "spread". The job of the spread model is to answer the question: "How wide should the spread be?". This could be as simple as: "A constant 10 basis points!" but when the market is volatile and everyone else pulls back, you'll probably wish you were doing something fancier.

### Limits and Deltas

Another critical piece of information you'll want is: "How much of asset X and Y do I have?", and "How much of asset X and Y do I want to have?". You'll probably want to store and update your balances in a central location, and your targets or limits are probably based off risk, or some trading strategy you want to implement. These are probably also stored in some other services that your bot will want to communicate with.

### Breakers

Lastly, another nice feature for a trading bot to have is a simple on/off switch. It's turned on manually, and it's flicked off when breakers are tripped. Breakers can be tripped on any logic you want, but a fairly sensible starting point is "More than X dollars traded in Y time". This system can be connected to a paging system and external dashboards. Starting and stopping trading are very common actions, and you want to make them as easy as possible to perform.

## Conclusion

Even the most complex systems can be broken down into a number of simple components!

I hope this information helps inform future decisions. It might give you fantastical ideas for new components, neat separation of responsibilities, or simply lead to the conclusion that building a decent trading system is a huge undertaking!
