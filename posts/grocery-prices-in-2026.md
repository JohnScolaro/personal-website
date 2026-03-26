---
title: "Grocery Prices in 2026"
description: "Comparing personal grocery spending to official inflation statistics"
date: "2026-03-22"
tags: ["Personal Finance", "Data Visualisation"]
---

Going grocery shopping in Brisbane over the last ~5 years has started to *feel* more expensive than normal. Regular inflation and Comsumer Price Index (CPI) updates by the Australian Bureau of Statistics (ABS) indicate that inflation did increase after COVID, and $1 in 2020 would be worth $1.23 in 2025. However, with a Cadbury family block apparently costing $8 now, it feels like grocery spending has outstripped inflation, and I'd like to compare my personal finances to the official statistics.

Since my wife and I use UP Bank, I can write some fairly basic Python to download all our transactions since we started using 2Up (UP Bank's shared account system) together in 2022. I can find everything we assigned to the "Groceries" saver, do some manual filtering to remove incorrectly attributed purchases, and aggregate purchases from the 20+ different Coles and Woolworths stores I visited. The result is this chart:

![A monthly spending chart showing total money spent at each store each month](/images/blog/grocery-prices-in-2026/chart.png)

I was very surprised to see that we hadn't increased our spending at all since 2022, and essentially spend the exact same amount. Naturally finance data is quite messy and extremely personal, so here are some extra information and caveats about this chart:

* During this time, Helen and I went from early dating, to being married, so I was expecting to see more lifestyle creep.
* This is only a grocery budget. We have a seperate takeaway budget, so this doesn't tell the entire story about our food spending.
* The two months with very low spending were because we were in Japan. We spent a lot, just not on groceries.
* I changed jobs three times in this period, so household income has fluctuated massively in this timeframe.

## Conclusions

* These results were a nice surprise to see.
* These results were very useful for refreshing our budget. (That's why I did this in the first place).
* A publicly available banking API is so useful, and a relatively simple feature to provide. It's crazy that only a single bank in Australia provides one.
* If only our spending on rent had risen the same amount. 😭

