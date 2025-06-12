---
title: "ByBit Error 110079"
description: "Some information on a vague crypto exchange error"
date: "2025-06-12"
tags: ["Cryptocurrency"]
---

Let's say that hypothetically you're writing code to trade on [ByBit](https://www.bybit.com/) via websockets, and you receive a response back from your order amend message saying:

> can not initiate replace_ao while still having pending item

Well, it was probably accompanied by the error code "110079", and you missed that. If you consult their error documentation [here](https://bybit-exchange.github.io/docs/v5/error) you'll see that this means: "The order is processing and can not be operated, please try again later". In a nutshell, the matching engine is processing your last amend order, and ByBit doesn't let you 'queue amends', so your message has been rejected.

What does this cryptic message mean? I have no idea! Neither does anyone on the internet either, because if you Google: "can not initiate replace_ao while still having pending item", literally nothing comes up, which is why I'm making this post.

This wont stop me from hypothesizing however:

## An educated guess

I think ByBit has architected their matching engine to be like an onion. 🧅

![A screenshot of Shrek explain to Donkey that Bybit is like an onion because "it has layers".](/images/blog/bybit-error-110079/shrek.png)

Matching engines seem like an inherently single process activity. It's not something that can be scaled with more processes, so the number of orders per second has a measurable upper bound. That upper bound is very high, thanks to years of optimisation, but it's not essentially unlimited.

So if your critical matching engine has limited throughput, you don't want to waste its time on a whole bunch of ephemeral tasks. The matching engine should be fed a constant stream of valid orders only, which can be matched and maintained at breakneck speeds.

![An image of a red onion chopped in half, and the layers are all labelled with different functions.](/images/blog/bybit-error-110079/onion.jpg)

My theory is that error "110079" is relatively close to the core of the onion.

I don't work for ByBit though, so take my rambling with a grain of salt.
