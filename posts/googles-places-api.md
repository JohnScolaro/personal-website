---
title: "Google's Places API (new)"
description: "Some gripes about Google's Places API"
date: "2025-03-30"
tags: ["Programming"]
---

Google has an API called the "Places API (new)". I've been using it a tiny bit to get some data for a personal project, and I have some grievances.

## The name is Terrible

Let's start simple. The name "Places API (new)" sounds like it was thought up by an intern, and somehow make it all the way to production without anyone at Google going: "Hang on a second, this might be confusing". In development, giving something a name like: "NewThing" which is intended to replace "Thing" and having it never be changed is a tale as old as time. Couldn't a v2 endpoint be created for the old "Places API"? How about a new name entirely?

## The Pricing is Confusing

The Places API has complex pricing. They have a [marketing page](https://mapsplatform.google.com/pricing/) attempting to explain the pricing, but to determine whether your API calls fit into the 'Essential', 'Professional', and 'Enterprise' tiers (terms typically used for quantity of API calls, but here used to describe how much data you want to request about each location) you need to understand specifically what fields you're asking for from [here](https://developers.google.com/maps/billing-and-pricing/pricing) and [here](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing).

This isn't super complex on its own, but required significantly more reading to understand what a single request would cost than something like AWS EC2 which is arguably more complex when you drill into the nitty-gritty pricing details.

## The Free Tier is Confusing

The free tier should be simple, and free. Something to let potential customers try the API before committing to it.

The **current** way the free tier works (as of March 2025) is that each one of the ~50 different API's making up the Places API (New) has a small number of free requests. For each API, that is on the order of ~$20 per API. This is often stated as "$3,250 free credits a month", which _technically_ it is, but realistically isn't.

On top of this, Google has changed the free tier pricing for the Places API fairly significally in the past, so attempting to Google how the free tier works will yield Reddit threads with the wrong information, making it all quite confusing to parse.

The [blog post](https://mattsayar.com/where-are-the-best-restaurants-in-my-city-a-statistical-analysis/) that inspired me to look at this data even says:

> Apparently every month everybody gets $200 in credits to use Maps stuff, and starting March 1st everyone is getting $3,250/mo in credits.

Which is misleading because the $200 of credits prior to March was for **ALL** Places APIs.

## It's Expensive

Let's see how much it costs to make 1,000 calls to the Enterprise Grade Places Nearby API.

![A screenshot of Google's Pricing table.](/images/blog/brisbanes-best-restaurants/pricing.png)

This confusing table means that **each additional 1,000 calls is $35 USD!** That's obscene!

![Homer Simpsons made of gold laughing](/images/blog/brisbanes-best-restaurants/homer_gold.gif)

Surely these prices put this up there with "most expensive API" in the world? I'd love to know if there are more expensive APIs. At this price-point, just punch me in the face every time I run `requests.post()`, it would hurt less.

## No way of getting user created content.

For my project, I was most interested in looking at reviews for different locations. Google offers no way to get review data. For their most expensive tier of requests, they will return 5 reviews per location to you. You don't get to choose which 5, Google will use some internal metrics/AI to determine which reviews are the best and give you those.

Consequently there is a market for [scapers](https://apify.com/compass/google-maps-reviews-scraper) to specifically scrape review data. Even if you do scrape this, review dates are displayed as a string like: "One day ago" or "3 years ago", so timestamps on reviews will never be particularly accurate.

The Google Maps walled garden has no doors for user created data. They stay locked firmly inside.

## Not enough done with cool stats for the community.

From my investigating, in the city of Brisbane, Google maps has over 1 million reviews. They have the review time, place, and rating for all restaurants over a city. With this Google could create city-wide leaderboards. They could do blog posts showing cool information about different cities.

But why would any company do this for free you might ask? Well let's pretend Google is straight up evil for a second. Wouldn't it be useful to give this info away on another API because:

- It would further build the community around Google Maps, cementing it even more as the top maps application.
- Let's other businesses create cool things from it you can steal later.
- Once people are reliant on the API, just raise the prices dramatically like they did with all the other APIs.

Maybe you could argue that you have to have this behind a small paywall, or it would be indescriminantly scraped for AI training, but you could potentially solve this with reasonable pricing.

## Terms of Service

Ok, so Google's not making any reviews public, and doesn't show us any cool statistics about our cities. Surely I'm allowed to do that myself then by using their API right? **Wrong!** The following is from the [Google Maps Terms of Service](https://cloud.google.com/maps-platform/terms?hl=en)

> 3.2.3 Restrictions Against Misusing the Services.

> (a) No Scraping. Customer will not export, extract, or otherwise scrape Google Maps Content for use outside the Services. For example, Customer will not: (i) pre-fetch, index, store, reshare, or rehost Google Maps Content outside the services; (...) (iii) copy and save business names, addresses, or (...)

> (c) No Creating Content From Google Maps Content. Customer will not create content based on Google Maps Content. (...)

So I'm not even actually allowed to download the data I'm paying for anyway! This means that both the blog post that inspired me, and my own post, are technically illegal! Which brings us to the next question...

## Who is this API even made for anyway?

I imagine the hypothetical service that uses this API is any expensive customer facing app that has Google maps integration. Data must only be kept within the users session, and not used elsewhere to satisfy the ToS.

## GCP Special Sauce

On top of everything else I've already written about the API, it sits inside Google Cloud Platform (GCP) which is Google giant cloud service business. GCP is famously not as good as AWS or Azure, (Just search "hackernews gcp bad" for more), and after this little project, I'll aim to never use them again.

Problems I had:

- Although Google knows exactly how many API calls I've made on the quotas and metrics pages in real time, they can't update billing for hours 🙄.
- Adding a monthly "budget" to your account doesn't stop you from not exceeding the budget.
- Notification for exceeding a budget are delivered 5 hours after breaching it.

While Google does warn you that this is how these services work, I still hate it.

## Conclusion

1. I'll never use Google Cloud Platform for serious web hosting.
2. I enjoy reviewing restaurants, and I often think about all the free data I've just given to Google over the years in the form of my reviews. I see people feeling the same away about their Twitter accounts, and now see Bluesky born of that resentment. I wonder if there is a Bluesky equivalent for restaurant reviews that could exist on the AT protocol, so users can own their data.
