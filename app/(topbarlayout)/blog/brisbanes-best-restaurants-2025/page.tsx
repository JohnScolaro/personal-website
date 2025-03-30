import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import RestaurantTable from "./RestaurantTable";
import Date from "../../../../components/date";

// Pre-processed data for showing static plots.
import processed_restaurant_data from "./processed_restaurants.json";
// import plotly_chart_data from "./example_plotly_chart.json";

// Images
import news_article_image from "./news_article.png";
import ackshually_image from "./ackshually.png";

export const metadata: Metadata = {
  title: "Brisbane's Best Restaurants - 2025",
  description: "I do some data analysis to find Brisbane's best restaurants.",
};
import dynamic from "next/dynamic";

export default function Page() {
  return (
    <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto prose-img:max-w-xl prose-img:w-full">
      <h1 className="mb-1 lg:mb-1 text-center">
        Brisbane's Best Restaurants - 2025
      </h1>
      <div className="text-center">
        <Date dateString={"2025-03-30"} />
      </div>
      <p>
        A few weeks ago I read this{" "}
        <Link
          href={
            "https://mattsayar.com/where-are-the-best-restaurants-in-my-city-a-statistical-analysis/"
          }
        >
          fantastic blog post
        </Link>{" "}
        which detailed how to download review data from the Google Places API,
        and use it to find the "Best Restaurants" in your town. They also:
      </p>
      <ul>
        <li>Explained the problems they ran into,</li>
        <li>Posted their code, and</li>
        <li>Explained that it cost $0 to get this data.</li>
      </ul>
      <p>As someone who is:</p>
      <ul>
        <li>Not willing to spend money on this,</li>
        <li>A data enjoyer, and</li>
        <li>A food enjoyer,</li>
      </ul>
      <p>This falls right into the intersection of things I like.</p>
      <p>
        So as the remnants of tropical cyclone Alfred turn Brisbane into a
        flooded swamp this weekend and keep me indoors, I thought I'd adapt
        Matt's analysis of his home town of{" "}
        <Link href={"https://en.wikipedia.org/wiki/Colorado_Springs,_Colorado"}>
          Colorado Springs
        </Link>{" "}
        to my hometown of{" "}
        <Link href={"https://en.wikipedia.org/wiki/Brisbane"}>Brisbane</Link>.
      </p>
      <h2>Hasn't this already been done?</h2>
      <img
        src="/images/blog/brisbanes-best-restaurants/already_done.png"
        alt="A screenshot of a comment on hackernews saying this has already been done."
      ></img>
      <p>
        Technically it has. You can take a hack at the problem and make a
        website that{" "}
        <Link
          href={
            "https://www.top-rated.online/countries/Australia/cities/Brisbane/all/our-rank"
          }
        >
          generically does this for every city in the world
        </Link>
        using Google's API, but this website only shows best "places" and not
        restaurants, and it's not entirely clear _how_ it's rating them.
        According to that website, the number 1 place in Brisbane is a random
        training facility 6km from the city, and the next best is "Lumber Punks"
        an axe throwing joint that also isn't a restaurant. I'd rather make my
        own list.
      </p>
      <h2>What do you mean by "Best Restaurant in Brisbane"?</h2>
      <p>
        I just mean a vague list of good restaurants. The problem is that:
        "Best", "Restaurant", and "Brisbane" are all subjective. Does "best"
        mean best for me, or best for the average person? Is a burger _better_
        than ramen, or are they just different? This comment on the original
        post sums it up nicely:
      </p>
      <img
        src="/images/blog/brisbanes-best-restaurants/customer_entitlement.png"
        alt="A comment about customer entitlement."
      ></img>
      <p>
        Also, what's a restaurant anyway? "Something that serves food" seems
        like a fair assumption, but the original author found a synagogue
        returned with their list of restaurants because technically they served
        food, even through primarily they weren't a restaurant.
      </p>
      <p>
        Let's all just admit that creating a "Best Restaurant List" is actually
        impossible, but playing with the data is fun, and may yummy dinners in
        the future, and therefore is worth the effort.
      </p>
      <h2>Attempt Numero Uno</h2>
      <p>
        The first thing I did was add another project to my GCP account. I went
        through the steps of enabling access to the hilariously named "Places
        API (new)" , and ran{" "}
        <Link
          href={
            "https://github.com/MattSayar/restaurants_rankings/blob/main/gcp_places_api_scraper.py"
          }
        >
          the script
        </Link>{" "}
        on Brisbane. By "Brisbane", I mean a circle of radius 15km around the
        centre of Brisbane. I live centrally, so this covers anything that I
        might want to drive to.
      </p>
      <img
        src="/images/blog/brisbanes-best-restaurants/brisbane_15km.png"
        alt="Google Maps with a 15km radius circle around Brisbane."
      ></img>
      <p>
        Since Google doesn't want people to do exactly what I'm attempting to
        do, (Collecting data about every restaurant in a city) they return a
        maximum of 20 places per API request. The solution used above splits
        Brisbane into roughly 1,000 different overlapping areas, and sends off 1
        query per area, collecting 20 businesses per query.
      </p>
      <p>
        I realised quickly that I was going to have to do some tweaking of the
        script due to the size differences between Colorado Springs and
        Brisbane. Colorado Springs has a population of almost 500,000.
        Brisbane's population is over 2,500,000. You could reasonably assume
        that Brisbane should have ~5x the number of restaurants. For dense areas
        like Brisbane CBD, I can imagine that finding 20 different restaurants
        within a 500m radius is an incredibly easy task, and consequently, we've
        probably dropped quite a lot of inner city restaurants. Since our API
        call uses `"rankPreference": "DISTANCE"` and not `"rankPreference":
        "POPULARITY"`, we're potentially dropping a lot of popular restaurants.
      </p>
      <p>
        At this point I'd love to just turn up the granularity of the
        sub-queries, but halving the search radius would 4x the number of
        queries, blowing me out of the "Places API (new)" free tier.
      </p>
      <h2>GCP Sucks</h2>
      <p>
        At this point, I realised I wanted to re-run the script so I could
        include some more fields, but thought I'd better check the billing again
        because I had a feeling I'd already used up my monthly quota.
      </p>
      <p>
        I reviewed the Places API for the umpteenth time, and attempted to make
        a little more sense of it. From what I've pieced together about the
        Places API's billing (which is described incredibly confusingly imo), is
        that there are three tiers of queries to the places API. 'Essential',
        'Professional', and 'Enterprise'. Naturally 'essential' is the cheapest
        and has the largest free tier, while enterprise is the most expensive
        and has the smallest free tier. Which data fields you request with your
        `searchNearby` query determine which tier your request falls into. For
        example, if you request the address of the business, it's an 'essential'
        request. If you also want the 'displayName' or 'googleMapsLinks', then
        it's a professional request, and if you also want 'ratings' or
        'priceLevel', then you're looking at an enterprise tier request.
      </p>
      <p>And here is the pricing of such an API call.</p>
      <img
        src="/images/blog/brisbanes-best-restaurants/pricing.png"
        alt="Google's Pricing table."
      ></img>
      <p>
        After the first 1,000 calls, each additional 1,000 calls is $35 USD!
        That's obscene!
      </p>
      <img
        src="/images/blog/brisbanes-best-restaurants/homer_gold.gif"
        alt="Homer Simpson made of gold laughing."
      ></img>
      <p>
        Since I already blew over my limit of 1,000 free calls in my first
        script invocation, I check my account's billing page and see that I have
        a bill of $0:
      </p>
      <img
        src="/images/blog/brisbanes-best-restaurants/billing.png"
        alt="Screenshot of the billing page."
      ></img>
      <p>
        Interesting... Why is my bill $0? I guess I can continue right?
        <b> Wrong!</b>
      </p>
      <p>
        So although Google knows exactly how many API calls I've made on the
        quotas and metrics pages, they can't update billing for hours 🙄. Also
        before doing any of this, I placed a monthly budget of $1 on my account
        so I'd know if I accidently breached the free tier. However, not only
        does this budget not stop you from exceeding the budget (don't be silly!
        There is <b> no</b> way of actually doing that) but it triggers hours
        after the limit has been reached. Despite breaching my limit of $1 at
        1:25pm, I only received an email at 6:23pm notifying myself of the fact.
        If I'd continued scraping at the rate I had been and not realised I was
        over the limit, I would have accumulated a bill over $2000.
      </p>
      <h2>The next day.</h2>
      <p>
        I check my account and find that I've been charged $20 AUD because I
        fired off 1,500 API calls. (First 1000 of the month are free, and the
        next 500 cost $20) which feels a little insane. The ease at which I can
        aquire an API key and call it millions of times is significantly easier
        than parsing the{" "}
        <Link
          href={
            "https://developers.google.com/maps/documentation/places/web-service/usage-and-billing"
          }
        >
          billing
        </Link>
        page of the Places API. Wait, no, is it{" "}
        <Link
          href={
            "https://developers.google.com/maps/billing-and-pricing/pricing"
          }
        >
          this
        </Link>
        billing page? Or is it actually{" "}
        <Link href={"https://mapsplatform.google.com/pricing/"}>this</Link>
        pricing page? And there is a lot of incorrect information floating
        around on the web about how much the API costs because it's changed
        multiple times over the years. I mean, here is a quote from the blog
        that inspired me to do this in the first place:
      </p>
      <q>
        Apparently every month everybody gets $200 in credits to use Maps stuff,
        and starting March 1st everyone is getting $3,250/mo in credits.
      </q>
      <p>
        This may have been true before March, but actually in March everyone
        *doesn't* get $3,250 credits, you get a hypothetical $3,250 in free
        usage if you used the full free tier of all 50+ Maps APIs. If you're
        just using one API (like we are), then you actually only get $35 USD of
        free tier, which is abysmal. At this point, just punch me in the face
        every time I run `requests.post()`, it would hurt less.
      </p>
      <p>I send Google support an email saying:</p>
      <q>
        Oopsie whoopsie I did a mistake and I pwomise not to do it again. 🫣
        Pwease refund my $20 🥺👉👈
      </q>
      <p>And they did.</p>
      <h2>Lessons Learnt.</h2>
      <ul>
        <li>Never use GCP for anything.</li>
        <li>
          Google can only get away with this egregious pricing because they have
          a monopoly.
        </li>
      </ul>
      <h2>The next GCP Billing Cycle</h2>
      Due to aformentioned monopoly, I'm back.
      <p></p>
      <img
        src="/images/blog/brisbanes-best-restaurants/once_again.jpg"
        alt="Bernie Sanders meme saying I'm once again asking for Brisbane's Restaurant Data."
      ></img>
    </article>
  );
}
