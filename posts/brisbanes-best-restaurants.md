---
title: "Brisbane's Best Restaurants"
description: "I do some data analysis to find Brisbane's best restaurants."
date: "2025-03-09"
tags: ['Brisbane', 'Data Visualisation']
---

A few weeks ago I read this [fantastic blog post](https://mattsayar.com/where-are-the-best-restaurants-in-my-city-a-statistical-analysis/) which detailed how to download review data from the Google Places API, and use it to find the "Best Restaurants" in your town. They also:

* Explained the problems they ran into,
* Posted their code, and
* Explained that it cost $0 to get this data.

As someone who is:

* Not willing to spend money on this,
* a data enjoyer, and
* a food enjoyer,

this falls right into the intersection of things I like.

So as the remnants of tropical cyclone Alfred turn Brisbane into a flooded swamp this weekend and keep me indoors, I thought I'd adapt Matt's analysis of his home town of [Colorado Springs](https://en.wikipedia.org/wiki/Colorado_Springs,_Colorado) to my hometown of [Brisbane](https://en.wikipedia.org/wiki/Brisbane).

## Hasn't this already been done?

![A screenshot of a comment on hackernews saying this has already been done.](/images/blog/brisbanes-best-restaurants/already_done.png)

Technically it has. You can take a hack at the problem and make a website that [generically does this for every city in the world](https://www.top-rated.online/countries/Australia/cities/Brisbane/all/our-rank) using Google's API, but this website only shows best "places" and not restaurants, and it's not entirely clear _how_ it's rating them. According to that website, the number 1 place in Brisbane is a random training facility 6km from the city, and the next best is "Lumber Punks" an axe throwing joint that also isn't a restaurant. I'd rather make my own list.

## What do you mean by "Best Restaurant in Brisbane"?

The problem is that: "Best", "Restaurant", and "Brisbane" are all subjective. Does "best" mean best for me, or best for the average person? Is a burger _better_ than ramen, or are they just different? This comment on the original post sums it up nicely:

![A screenshot of a comment on hackernews saying that ratings seem to be more about the entitlement of the customer than the quality of the food.](/images/blog/brisbanes-best-restaurants/customer_entitlement.png)

Also, what's a restaurant anyway? "Something that serves food" seems like a fair assumption, but the original author found a synagogue returned with their list of restaurants because technically they served food, even through primarily they weren't a restaurant.

And lastly, what's Brisbane? The Brisbane local government area probably makes the most sense, but that has complex boundaries. Instead let's start with a circle of radius 15km around Brisbane CBD.

![A screenshot of Google Maps with a 15km radius circle around it.](/images/blog/brisbanes-best-restaurants/brisbane_15km.png)

Here is Brisbane with a 15km radius circle overlaid. I live in Southbank, so this includes everything I might want to drive to.

## Attempt Numero Uno

The first thing I did was add another project to my GCP account. I went through the steps of enabling access to the hilariously named "Places API (new)" , and ran [the script](https://github.com/MattSayar/restaurants_rankings/blob/main/gcp_places_api_scraper.py) on Brisbane.

Since Google doesn't want people to do exactly what I'm attempting to do, (Collecting data about every restaurant in a city) they return a maximum of 20 places per API request. The solution used above splits Brisbane into roughly 1,000 different overlapping areas, and sends off 1 query per area, collecting 20 businesses per query.

I realised quickly that I was going to have to do some tweaking of the script due to the size differences between Colorado Springs and Brisbane. Colorado Springs has a population of almost 500,000. Brisbane's population is over 2,500,000. You could reasonably assume that Brisbane should have ~5x the number of restaurants. For dense areas like Brisbane CBD, I can imagine that finding 20 different restaurants within a 500m radius is an incredibly easy task, and consequently, we've probably dropped quite a lot of inner city restaurants. Since our API call uses `"rankPreference": "DISTANCE"` and not `"rankPreference": "POPULARITY"`, we're potentially dropping a lot of popular restaurants.

At this point I'd love to just turn up the granularity of the sub-queries, but halving the search radius would 4x the number of queries, blowing me out of the "Places API (new)" free tier.

## GCP Sucks

At this point, I realised I wanted to re-run the script so I could include some more fields, but thought I'd better check the billing again because I had a feeling I'd already used up my monthly quota.

I reviewed the Places API for the umpteenth time, and attempted to make a little more sense of it. From what I've pieced together about the Places API's billing (which is described incredibly confusingly imo), is that there are three tiers of queries to the places API. 'Essential', 'Professional', and 'Enterprise'. Naturally 'essential' is the cheapest and has the largest free tier, while enterprise is the most expensive and has the smallest free tier. Which data fields you request with your `searchNearby` query determine which tier your request falls into. For example, if you request the address of the business, it's an 'essential' request. If you also want the 'displayName' or 'googleMapsLinks', then it's a professional request, and if you also want 'ratings' or 'priceLevel', then you're looking at an enterprise tier request.

And here is the pricing of such an API call.

![A screenshot of Google's Pricing table.](/images/blog/brisbanes-best-restaurants/pricing.png)

After the first 1,000 calls, each additional 1,000 calls is $35 USD! That's obscene!

![Homer Simpsons made of gold laughing](/images/blog/brisbanes-best-restaurants/homer_gold.gif)

Since I already blew over my limit of 1,000 free calls in my first script invocation, I check my account's billing page and see that I have a bill of $0:

![Screenshot of the billing page](/images/blog/brisbanes-best-restaurants/billing.png)

Interesting... Why is my bill $0? I guess I can continue right? **Wrong!**

So although Google knows exactly how many API calls I've made on the quotas and metrics pages, they can't update billing for hours 🙄. Also before doing any of this, I placed a monthly budget of $1 on my account so I'd know if I accidently breached the free tier. However, not only does this budget not stop you from exceeding the budget (don't be silly! There is **no** way of actually doing that) but it triggers hours after the limit has been reached. Despite breaching my limit of $1 at 1:25pm, I only received an email at 6:23pm notifying myself of the fact. If I'd continued scraping at the rate I had been and not realised I was over the limit, I would have accumulated a bill over $2000.

## The next day.

I check my account and find that I've been charged $20 AUD because I fired off 1,500 API calls. (First 1000 of the month are free, and the next 500 cost $20) which feels a little insane. The ease at which I can aquire an API key and call it millions of times is significantly easier than parsing the [billing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing) page of the Places API. Wait, no, is it [this](https://developers.google.com/maps/billing-and-pricing/pricing) billing page? Or is it actually [this](https://mapsplatform.google.com/pricing/) pricing page? And there is a lot of incorrect information floating around on the web about how much the API costs because it's changed multiple times over the years. I mean, here is a quote from the blog that inspired me to do this in the first place:

> Apparently every month everybody gets $200 in credits to use Maps stuff, and starting March 1st everyone is getting $3,250/mo in credits.

This may have been true before March, but actually in March everyone *doesn't* get $3,250 credits, you get a hypothetical $3,250 in free usage if you used the full free tier of all 50+ Maps APIs. If you're just using one API (like we are), then you actually only get $35 USD of free tier, which is abysmal. At this point, just punch me in the face every time I run `requests.post()`, it would hurt less.

I send Google support an email saying:

> Oopsie whoopsie I did a mistake and I pwomise not to do it again. 🫣 Pwease refund my $20 🥺👉👈

And they did.

## Lessons Learnt.

* Never use GCP for anything.
* Google can only get away with this egregious pricing because they have a monopoly.

## The next GCP Billing Cycle

Due to aformentioned monopoly, I'm back. With a vengance.

![A meme of Bernie Sanders, but captioned "I'm once again asking for Brisbane's Restaurant Data".](/images/blog/brisbanes-best-restaurants/once_again.jpg)