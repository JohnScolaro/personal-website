import type { Metadata } from "next";
import Link from "next/link";
import { useState, useMemo } from "react";
import RestaurantTable from "./RestaurantTable";
import Date from "../../../../components/date";
import Image from "next/image";

// Pre-processed data for showing static plots.
import processed_restaurant_data from "./processed_restaurants.json";
import scatter_plot_1 from "./scatter_plot_rating_vs_reviews.json";
import scatter_plot_2 from "./scatter_plot_rating_vs_reviews_categories.json";

// Images
import already_done from "./already_done.png";
import brisbane_15km from "./brisbane_15km.png";
import customer_entitlement from "./customer_entitlement.png";
import funny_review from "./funny_review.png";
import meme from "./meme.png";
import histogram_of_number_of_reviews from "./histogram_of_number_of_reviews.png";
import histogram_of_review_ratings from "./histogram_review_ratings.png";

export const metadata: Metadata = {
  title: "Brisbane's Best Restaurants - 2025",
  description: "I do some data analysis to find Brisbane's best restaurants.",
};

// import dynamic from "next/dynamic";

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
      <Image
        src={already_done}
        alt="A screenshot of a comment on hackernews saying this has already been done."
        width={890}
        height={150}
      ></Image>
      <p>
        Yeah - badly.{" "}
        <Link
          href={
            "https://www.top-rated.online/countries/Australia/cities/Brisbane/all/our-rank"
          }
        >
          This website does this for every city in the world
        </Link>
        . It's also not entirely clear <i>how</i> it's rating them. According to
        that website, the number 1 place in Brisbane is a random training
        facility 6km from the city, and it's definately not doing anything fancy
        with Wilson Score intervals like Matt's analysis was. I'd rather make my
        own list.
      </p>
      <h2>What do you mean by "Best Restaurant in Brisbane"?</h2>
      <p>
        I just mean a vague list of good restaurants. The problem is that:
        "Best", "Restaurant", and "Brisbane" are all subjective. Does "best"
        mean best for me, or best for the average person? Is a burger{" "}
        <i>better</i> than ramen, or are they just different? This comment on
        the original post sums it up nicely:
      </p>
      <Image
        src={customer_entitlement}
        alt="A comment about customer entitlement."
        width={764}
        height={378}
      ></Image>
      <p>
        Also, what's a restaurant anyway? "Something that serves food" seems
        like a fair assumption, but the original author found a synagogue
        returned with their list of restaurants because technically they served
        food, even through primarily they aren't a restaurant.
      </p>
      <p>
        Let's just admit to ourselves right now that defining a "Best
        Restaurant" is actually impossible, and that "A list of good
        restaurants" is fine, because it'll still help me unearth hidden gems.
      </p>
      <p>Also, it's about the journey, not the destination! Right?!</p>
      <h2>The Data</h2>
      <p>
        Here is Brisbane with a 15km radius circle overlaid. I live centrally,
        so this includes everything I might want to drive to.
      </p>
      <Image
        src={brisbane_15km}
        alt="A screenshot of Google Maps with a 15km radius circle around it."
        width={1454}
        height={1408}
      ></Image>
      <p>
        I heavily modify{" "}
        <Link
          href={
            "https://github.com/MattSayar/restaurants_rankings/blob/main/gcp_places_api_scraper.py"
          }
        >
          the script
        </Link>
        , and run it on Brisbane. Modifications were needed to:
      </p>
      <ol>
        <li>Change the location from Colorado Springs to Brisbane.</li>
        <li>
          Change{" "}
          <code className="before:content-none after:content-none">
            "rankPreference": "DISTANCE"
          </code>{" "}
          to{" "}
          <code className="before:content-none after:content-none">
            "rankPreference": "POPULARITY"
          </code>{" "}
          so if we're going to drop restaurants (due to a 20 restaurant limit
          per API call), we're at least dropping the less popular ones.
        </li>
        <li>
          Some tweaking for sub-query sizes so that I don't make too many,
          blasting me out of the free tier, and I don't make too few, dropping
          loads of restaurants.
        </li>
      </ol>
      <p>
        This was actually not an easy process, and I have a lot of feelings
        about Google Cloud Platform (GCP) and the Maps API after doing this, so
        feel free to read my rant about those in this post{" "}
        <Link href={"/blog/googles-places-api"}>here</Link>.
      </p>
      <h2>Finders</h2>

      <p>
        The first thing I wanted to try, was using the Wilson Score to find the
        best restaurants. I made a table that lets me change the confidence
        interval with a slider. I also added the ability to switch it to "worst
        restaurants" too, in which I use the upper bound of the confidence
        interval instead of the lower one. Here it is in action:
      </p>

      <Image
        src={histogram_of_review_ratings}
        alt="A histogram showing the number of restaurants with each review ratings. The mode is clearly 4.5."
        width={600}
        height={400}
      ></Image>
      <p>
        Since I've got data for every restaurant in Brisbane, it's also useful
        to plot some general statistics about them.
      </p>

      <p>Here is a histogram of</p>
      <Image
        src={histogram_of_number_of_reviews}
        alt="A histogram showing the number of reviews a restaurant would typically have. The mode is roughly 200."
        width={600}
        height={400}
      ></Image>
    </article>
  );
}
