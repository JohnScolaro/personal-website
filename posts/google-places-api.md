---
title: "Google's Places API (new)"
description: "Some gripes about Google's Places API"
date: "2025-03-30"
tags: ["Programming"]
---

Google has an API called the "Places API (new)". I've been using it a little bit to get some data for a [personal](/projects/brisbanes-best-restaurants/2025) [project](/blog/brisbanes-best-restaurants-2025), and I have some grievances.

## The Name is Terrible

Let's start simple. The name "Places API (new)" sounds like it was thought up by an intern and somehow made it all the way to production without anyone at Google saying, "Hang on a second, this might be confusing."

In development, naming something "NewThing" to replace "Thing"—only for it to remain unchanged for years—is a tale as old as time. Couldn't they have just created a v2 endpoint for the old "Places API"? Or, better yet, come up with a proper new name?

## The Pricing is Confusing

The Places API has complex pricing. They have a [marketing page](https://mapsplatform.google.com/pricing/) attempting to explain the pricing, but to determine whether your API calls fit into the 'Essential', 'Professional', and 'Enterprise' tiers (terms typically used to describe API call volume, but here describe how much data you request about each location) you need to understand specifically what fields you're asking for from [here](https://developers.google.com/maps/billing-and-pricing/pricing) and [here](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing).

This isn't super complex on its own, but required significantly more reading to understand a single request's cost than something like AWS EC2 which is arguably more complex when you drill into the nitty-gritty pricing details.

## The Free Tier is Confusing

The free tier should be free and simple. Something to let potential customers try the API before committing to it.

The **current** free tier (as of March 2025) works by giving you ~$20 of credit across each of the ~50 different API's making up the "Places API (New)". This is often stated as "$3,250 free credits a month", for marketing reasons, which _technically_ it is, but realistically isn't, because nobody wants to test all 50+ APIs.

On top of this, Google has changed the free tier pricing fairly significally in the past, so attempting to search how the free tier works will yield Reddit threads with the wrong information, making it all quite confusing to parse.

The [blog post](https://mattsayar.com/where-are-the-best-restaurants-in-my-city-a-statistical-analysis/) that inspired me to look at this data even says:

> Apparently every month everybody gets $200 in credits to use Maps stuff, and starting March 1st everyone is getting $3,250/mo in credits.

Which is somewhat misleading.

## It's Expensive

Let's see how much it costs to make 1,000 calls to the Enterprise Grade Places Nearby API.

![A screenshot of Google's Pricing table.](/images/blog/google-places-api/pricing.png)

This confusing table means that **each additional 1,000 calls is $35 USD!** That's obscene!

![Homer Simpsons made of gold laughing](/images/blog/google-places-api/homer_gold.gif)

Surely these prices put this up there with "most expensive API" in the world? I'd love to know if there are more expensive APIs. At this price-point, just punch me in the face every time I run requests.post() - it would hurt less.

## No way of getting user created content.

For my project, I was most interested in looking at retaurant reviews. Google offers no way to access review data. For their most expensive tier of requests, they will return 5 reviews per location to you. You don't get to choose which 5, Google will use some internal metrics/AI to determine which reviews are the best and give you those.

Consequently there is a market for [scapers](https://apify.com/compass/google-maps-reviews-scraper) to specifically scrape review data. Even if you do scrape this, review dates are displayed as a string like: "One day ago" or "3 years ago", so timestamps on reviews will never be particularly accurate.

The Google Maps walled garden has no doors for user-created content. That stays firmly locked away.

## Not enough done with cool stats for the community.

In Brisbane alone, Google Maps contains over 1 million restaurant reviews. They have timestamps, locations, and ratings. With this data, Google could generate city-wide leaderboards or publish insightful information about the city.

"But why would any company do this for free?" you might ask? Well let's pretend Google is straight up evil for a second. Wouldn't it make sense to provide this info via API because:

- It would further build the community around Google Maps, cementing it even more as the top maps application. (Network effect go brrr)
- It lets other businesses take risks to create cool things, which Google can later buy or copy.
- Once businesses rely on the API, dramatically jack up the prices. (Like they did with all the other APIs)

Maybe you could argue that you have to have this behind a small paywall, or it would be indescriminantly scraped for AI training, but you could potentially solve this with reasonable pricing, and argue that it's currently being scraped for AI training regardless.

## Terms of Service

Okay, so Google doesn't allow review access, or generate cool city-wide insights. Surely, I can do that myself using their API, right? **Wrong**. The following is straight from the [Google Maps Terms of Service](https://cloud.google.com/maps-platform/terms?hl=en).

> 3.2.3 Restrictions Against Misusing the Services.

> (a) No Scraping. Customer will not export, extract, or otherwise scrape Google Maps Content for use outside the Services. For example, Customer will not: (i) pre-fetch, index, store, reshare, or rehost Google Maps Content outside the services; (...) (iii) copy and save business names, addresses, or (...)

> (c) No Creating Content From Google Maps Content. Customer will not create content based on Google Maps Content. (...)

So even after paying for the data, I'm not even allowed to use it outside of the users session? This actually means that both the blog post that inspired me, and my own post, are technically illegal! Which brings us to the next question...

## Who is this API even made for anyway?

I imagine the hypothetical service that uses this API is any expensive customer facing app that has Google maps integration. That's all I can think of.

## GCP Issues

On top of everything else I've already written about the API, it sits inside Google Cloud Platform (GCP) which is Google giant cloud service business. GCP is famously not as good as AWS or Azure, (Just search: "hackernews gcp bad" for more), and after this little project, I'll aim to never use them again.

Problems I had:

- Although Google knows exactly how many API calls I've made in _real-time_ (on the quotas and metrics page), they can't update billing for hours 🙄.
- Adding a monthly "budget" to your account doesn't stop you from not exceeding the budget.
- Notification for exceeding a budget are delivered 5 hours after breaching it.

While Google does warn you that this is how these services work, I still hate it.

![A meme of the scene with Jerry from Seinfeld complaining about a restaurant not being able to hold a reservation, but applied to Google not being able to enforce a budget.](/images/blog/google-places-api/take_not_hold.png)

## Conclusion

1. I'll never use Google Cloud Platform for serious web hosting.
2. I enjoy reviewing restaurants, and I often think about all the free data I've just given to Google over the years in the form of my reviews. I see people feeling the same way about their Twitter accounts, and now see Bluesky born of that resentment. I wonder if a Bluesky-like platform for restaurant reviews could emerge - one built on the AT protocol, giving users full ownership of their data.
