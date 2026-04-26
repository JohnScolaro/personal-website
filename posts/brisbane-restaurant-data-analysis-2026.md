---
title: "Brisbane Restaurant Data - 2026"
description: "Methodology and analysis of Brisbane restaurant data in 2026, including updates to data collection interesting changes."
date: "2026-04-24"
tags: ['Brisbane', 'Data Analysis']
---

As 2026 rolled around, I realised that my [list of Brisbane's best restaurants](/projects/brisbanes-best-restaurants/2025) and [subsequent data analysis](/blog/brisbanes-best-restaurants-2025) were slowly becoming outdated and needed a refresh. My website was no longer on the cutting edge of Brisbane's culinary scene. 🥲 I re-acquainted myself with Google's infuriatingly confusing [Places API](/blog/google-places-api) and pulled the data, which I've used to create my list of the [2026 Best Restaurants in Brisbane](/projects/brisbanes-best-restaurants/2026).

## Changes

### Query Area

The challenge in this project is that Google's API isn't designed for this. Each query to Google's API has a centre and a radius, and you get the 20 most popular results from in that area. You also only get 1000 free queries each month before Google steals your wallet. I threw my previous inefficient implementation away, and with the help of AI, created a new - significantly more optimal - scanning approach. Shown below are the ~900 queries I used to scan Brisbane.

![An image of Brisbane with 900 interecting circles overlaid to cover the entire city.](/images/blog/brisbane-restaurant-data-analysis-2026/zoom_out_map.png)

Some points to note are:

* Density of queries increases as you get closer to the city. This is because intuitively, restaurant density is higher in the city.
* I've excluded D'aguilar National Park because it is distinctly lacking in restaurants.
* I've sparsely queried Moggill and Logan, so they can be included in my list. While Logan may be >15km away, it's very quick to reach with the help of the Pacific Motorway, so if there is something good there, I want to know about it.

Here is a zoomed in image of the CBD, so you can see how many queries cover it.

![The same map as above, but zoomed in to show just Brisbane CBD, and how the circles are significantly smaller and more numerous in the city.](/images/blog/brisbane-restaurant-data-analysis-2026/zoom_in_map.png)

Last year I simply queried everything within ~15km at the same resolution. In 2025 I had data for ~2700 resturants, but in 2026 I have ~3480. I think smarter querying contributed heavily to the extra data at a lower cost.