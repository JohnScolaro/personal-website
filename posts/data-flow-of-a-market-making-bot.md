## Introduction

I love software development. One of my favourite parts of building any somewhat large and complex blob of software is breaking the large problem with all its complexity and requirements into a bunch of smaller simple parts that work harmoniously together to perform their function.

Knowing when to create a new component is sometimes clear and obvious. Othertimes it's hard and nigh-impossible to see without attempting to solve the problem first. Defining the "scope" of a component - the "bounds" of it's interface - can similarly be simple or nigh-impossible. Arguing about the scope of components is like drawing borders between countries on a map. Sometimes, as with Australia's border, it's relatively simple[^1]: "The whole island is one country!". But sometimes components are complex, and responsibilities blur between them, sparking endless debate about what should belong to what. Perhaps like the borders of India and Pakistan.

Components often start simple, and grow and grow until they birth many more components that perform functionality whose necessesity slowly revealed itself to the writer as niche edge-cases appear.

I enjoy thinking about the best way to seperate things, because a loosely-coupled system lowers the cognitive load of working on a component and _makes life easier_.

I enjoy sharing the composition of these components for different problems (as I did for my small "match 3" game somewhat recently), because if you have an idea of the components required to solve a problem, that's a significant amount of the problem already solved.

## A Market Maker Bot

One system I've been wrestling with for the last year is a market making bot. I'm going to assume knowledge of [limit order books](https://en.wikipedia.org/wiki/Central_limit_order_book) for the rest of this piece, so if you don't know what they are, read up on them. In a nutshell, a market making bot is a computer program that can quickly post many limit orders in an orderbook so if people want to buy or sell something on an exchange, there is a seller/buyer waiting for them. Of course, the reason to do this is because if you sell potatoes at $11 and buy them at $10, you can make a small profit from the difference in prices. Also exchange fees are significantly smaller for maker orders than for taker orders - sometimes they're even negative! - so , so the exchange PAYS you to, so if you're looking to move into a position, it is more cost effective to use maker orders instead of taker orders.

In practice this "market making" is anything but simple, and "what price should something be" is basically an unsolvable problem that has nerd-sniped millions of smart people throughout history, whose time may have potentially been better spent actually growing potatoes.

Additionally, since "trading" is sort of a zero sum game, and there is only so much volume for market makers to compete for, nobody in this business ever tells anyone what the best way to do things is. If you're doing something smart and it's making you money, be definition you don't really want to tell anyone what you're doing, or how you're doing it, otherwise they'll do it and you won't money any more! Consequently, it feels like there is more secrecy in the trading industry than almost all others and I think that's a real shame.

I'm going to share how our system works anyway. For a few reasons:

- Maybe someone smarter than me can look at it and say: "Wow that's a horrible idea, you should do X instead", and I can learn from it.
- Maybe it will accelerate the progress of someone creating a similar system.
- It's simply a place to explain something I made, so when I return to it in 5 years, I'll remember what I built in 2025.
- Maybe even just some of the language used might be useful for readers.
- If you think that making a market making bot might be a fun and simple side-project, this might change your mind.

So with that out of the way, let's get on with the show:

## The Components

I'm a visual learner, so here is a diagram showing a bunch of components, and arrows between them showing "data flow".

[A draw.io diagram with a whole bunch of boxes and arrows between them.](data-flow-of-a-market-making-bot.md)

Now let's explore the roles and responsibilities of these components one-by-one. I'll explain some of the design decisions and hidden complexities each of these components handle that you might not have considered.

### The Engine

The largest component of all, the "engine", is the giant block that contains all the other blocks. The jobs of the engine are:

- Plumb data between all components.
- Deal with initialisation.
- Sit in an infinite loop pumping data through components and trading.
- Gracefully handle shutdowns, reboots, and internal errors from components.

Initialisation alone can be tough, because you probably don't want to trade until you can calculate the price you want to quote at. You might only know that price when you've connected to internal services and received your balances, limits, current prices, current volatility, etc, etc, etc. There is an order to it! Almost like a dependancy graph!

It's also important to gracefully handle exceptions. Because there _will_ be exceptions, and you should restart gracefully and send logs to wherever your logs are stored so they can be carefully analysed at a later date.

Now that I've talked about the engine, I've decided a sensible order to attack the remaining components is from left to right, but I'm going to leave the ingress/egress gateways and the breakers till last. These components will tell the tale of "how to calculate a fair price".

### Reference Pricer

A reference pricer is a module that gives you a price of some pair. For example, BTC:USDT = $100,000. How it gets this though, that'll depend on how you decide to do it! Here are some ideas for different _types_ of ReferencePricers:

- Just get the midpoint from binance
- Maybe average the traded prices from a number of exchanges
- Something fancy with AI!

The two objectives of this module are:

1: Give you a price.
2: Be generic enough that it can be swapped.

### Price Graph

### The Quote Model

The "Quote Model" is a state machine that manages the state of a single quote. It receives generic messages from the egress_gateway, and sends generic messages to

Examples of generic messages you could receive:

- Your quote has been filled.
- Your cancel has been accepted.
- Your insert has failed with error message X.
- You've been rate limited.

Examples of generic messages you could send:

- Insert an order of quantity Y at price X.
- Modify quantity Z of order A.
- Cancel an order.

This is the heart of the trading engine where "what you could do" is decided. Consequently there are a bunch of fun design decisions that are made here. Things like:

- If a price is changed, could we cancel and insert, or should we amend?
- How many messages are allowed in-flight for a single quote at a time?
- If we want to place orders outside of the exchanges safety limits, we need to cancel them.

Obviously it's important that this component perform correctly, but also the messaging protocol between the quote model and the ingress gateway is very important too. Different exchanges have different intricacies, and if you can make the quote model generic to work for as many as possible, that'll save a lot of work.

This component also manages the difference between "target" prices, and actual acceptable prices. Limit order books have both minimum tick sizes and minimum lot sizes. This means if your target price is $12.345, but the exchange only accepts orders at $12.34 and $12.35, you'll have to decide which of these to quote at.

_Another_ duty of this component is to manage how closely the target price should be followed. How far should the current price deviate from the target price before you change the price of the order. The lower the allowed deviation, the more accurate your prices are, and the less chance you'll get picked off. But you'll send more messages, exhausting your rate limit which _increases_ your changes of getting picked off when it actually matters! A tough problem!

Also it's important that this component be fast, because if you want to quote 3 levels on each side of a price, you'll need 6 state machines. Which leads us nicely to the next component!

### The Quote Model Manager

The jobs of the quote model manager are:

- Be a container for all the quotes, simplifying sending and retrieving data from all of them at once.
- Calculate and set the target prices and quantities of the quotes.
- Provide simple functions to cancel all bids and asks.

You might have different quote model managers that set different prices and quantities. For example you may want:

- 3 bids and 3 asks, each with a value of $10.
- 3 bids and 3 asks, but the tightest levels have a value of $5, and the further back you are, the larger the orders get.

### Breakers

### The Egress and Ingress Gateways

For a change of flavour, lets

- The Engine
- Quote Model
- Quote Model Manager
- Spread Calculator
-

[^1]: Find an example of australias sea borders actually being somewhat complex.
[^2]: Link ww2 lmao
