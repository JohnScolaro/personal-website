import type { Metadata } from "next";
import Link from "next/link";
import RestaurantTable from "../../projects/brisbanes-best-restaurants/2025/RestaurantTable";
import Date from "../../../../components/date";
import Image from "next/image";

// Pre-processed data for showing static plots.
import scatter_plot_1 from "./scatter_plot_rating_vs_reviews.json";
import scatter_plot_2 from "./scatter_plot_rating_vs_reviews_categories.json";

// Images
import already_done from "./already_done.png";
import brisbane_15km from "./brisbane_15km.png";
import customer_entitlement from "./customer_entitlement.png";
import chains from "./chains.png";
import price from "./price.png";
import histogram_of_number_of_reviews from "./histogram_of_number_of_reviews.png";
import histogram_of_review_ratings from "./histogram_review_ratings.png";
import brisbane_tier_list from "./brisbane_tier_list.jpeg";
import tirimisu from "./tirimisu.jpg";

export const metadata: Metadata = {
  title: "Brisbane's Best Restaurants - 2025",
  description: "I do some data analysis to find Brisbane's best restaurants.",
  openGraph: {
    title: "Brisbane's Best Restaurants - 2025",
    description: "I do some data analysis to find Brisbane's best restaurants.",
    url: "https://johnscolaro.xyz/blog/brisbanes-best-restaurants-2025",
    images: [
      {
        url: "https://johnscolaro.xyz/images/preview_images/brisbanes-best-restaurant-2025.png",
        width: 1200,
        height: 624,
        alt: "An image of text saying: 'Brisbanes Best Restaurant 2025'",
      },
    ],
  },
};

import dynamic from "next/dynamic";

export default function Page() {
  const PlotlyChart = dynamic(
    () => import("../../../../components/wrapped-plotly-chart"),
    {
      ssr: false,
    }
  );

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
      <Image
        src={tirimisu}
        alt="A screenshot of a comment on hackernews saying this has already been done."
        width={1075}
        height={1423}
      ></Image>
      <p>Here is a tirimisu this work has already found me. Worth it.</p>
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
        that website, the number one place in Brisbane is a random training
        facility 6km from the city, and it's definitely not doing anything fancy
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
        Let's just admit to ourselves right now that defining a "Best
        Restaurant" is actually impossible, and that "A list of good
        restaurants" is fine, because the whole goal is really to uncover hidden
        gems, and it'll still help me unearth hidden gems.
      </p>
      <p>Also, it's about the journey, not the destination! Right?!</p>
      <h2>The Data</h2>
      <p>
        Here is Brisbane with a 15km radius circle overlaid. I live centrally,
        so this includes everything I might want to drive to. I attempted to
        scrape all the restaurant data in this area.
      </p>
      <Image
        src={brisbane_15km}
        alt="A screenshot of Google Maps with a 15km radius circle around it."
        width={1454}
        height={1408}
      ></Image>
      <p>
        I heavily modified{" "}
        <Link
          href={
            "https://github.com/MattSayar/restaurants_rankings/blob/main/gcp_places_api_scraper.py"
          }
        >
          the script
        </Link>
        , and ran it on Brisbane. Modifications were needed to:
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
        <Link href={"/blog/google-places-api"}>here</Link>.
      </p>
      <h2>Findings</h2>
      <p>
        I find that it's always useful to visualise some general statistics
        about your dataset before doing what you actually want, because it helps
        you 'get a feel for it'. In that vein, here is a histogram of average
        restaurant ratings in Brisbane:
      </p>
      <Image
        src={histogram_of_review_ratings}
        alt="A histogram showing the number of restaurants with each review ratings. The mean is 4.2. The mode is clearly 4.5."
        width={600}
        height={400}
      ></Image>
      <p>
        So if you were ever wondering what the average rating was in Brisbane,
        it's 4.2. Let's also see roughly how many reviews restaurants have:
      </p>
      <Image
        src={histogram_of_number_of_reviews}
        alt="A histogram showing the number of reviews a restaurant would typically have. The mode is roughly 200. The mean is 348."
        width={600}
        height={400}
      ></Image>
      <p>
        So if you're a restaurant owner, having more than 348 reviews makes you
        better than average!
      </p>
      <p>Let's show all of Brisbane's restaurants on a single plot:</p>
      <PlotlyChart
        data={scatter_plot_1.data}
        layout={{
          ...scatter_plot_1.layout,
          xaxis: { ...scatter_plot_1.layout.xaxis, fixedrange: true },
          yaxis: { ...scatter_plot_1.layout.yaxis, fixedrange: true },
        }}
        config={{ displayModeBar: false }}
      ></PlotlyChart>
      <p>
        That's a lot of restaurants! Here you can see the dense mass of average
        restaurants, (and I'm sure some great ones too), but what I'm most
        interested here, are the restaurants with the most reviews for each
        rating level. Mouse over the points on the plot to take a look for
        yourself.
      </p>
      <p>
        Interestly, as you move down the scale from the best to the worst
        Brisbane has to offer, you maybe start to notice a pattern. May I
        present what I call: "The 4 horsemen of the Brisbane restaurant scene":
      </p>
      <Image
        src={brisbane_tier_list}
        alt="A four panel winnie the pooh meme, ordered from fanciest to least fancy. It is captioned: 'Establishments with the word 'hotel' in them.', 'McDonalds', 'KFC', 'Anything at the domestic airport terminal'."
        width={500}
        height={740}
      ></Image>
      <p>
        Intuitively this makes sense. Airports tend to abuse their captive
        audience, and that's not conducive to being reviewed positively.
      </p>
      <p>
        However, we can go a step further here, and with the power of computer,
        we can show these four group on the same chart! (with Subway for scale.)
      </p>
      <PlotlyChart
        data={scatter_plot_2.data}
        layout={{
          ...scatter_plot_2.layout,
          xaxis: { ...scatter_plot_2.layout.xaxis, fixedrange: true },
          yaxis: { ...scatter_plot_2.layout.yaxis, fixedrange: true },
        }}
        config={{ displayModeBar: false }}
      ></PlotlyChart>
      <p>
        The last thing I wanted to try, was to try using the Wilson Score to
        find "best restaurants" using the number of reviews as a sort of
        'confidence' in the rating, and then using the lower bound of that
        confidence as the score. I made a table with a slider that lets me
        change the parameter that controls how much confidence each review adds.
        I also added the ability to switch it to "worst restaurants" too, in
        which I use the upper bound of the confidence interval instead of the
        lower one. This is useful for searching for the funniest Google reviews.
        Here is the table in action:
      </p>
      <RestaurantTable></RestaurantTable>
      <p>
        There were a number of other things we looked at, and wished we could
        look at while playing with this data. Let's take a look at some of
        those:
      </p>
      <h2>Restaurant Chains</h2>
      <p>
        Brisbane has a lot of different restaurant chains, but which ones are
        best? How many stores do each chain have? How well are they rated? Well
        let me answer that for you.
      </p>
      <Image
        src={chains}
        alt="A bar graph showing the ratings of all the chains in Brisbane, along with the standard deviation and number of stores."
        width={800}
        height={600}
      ></Image>
      <h2>Cuisine</h2>
      <p>
        Something else I would have liked to add as a filter in the "Best
        Restaurants" table is cuisine, so I can ask "What is the best{" "}
        <i>Indian</i> restaurants in Brisbane?" but we run into some limitations
        here.
      </p>
      <p>
        Aproximately half of all the restaurants don't have cuisine data
        associated with them. I think Google can attempt to guess the cuisine,
        but relies on business owners to actually add it to their business
        manually on Google. Naturally, many business owners who would rather
        cook food than do marketing simply don't do this, and you have
        restaurants called: "Bob's Vietnamese Shop" in the category of
        "Restaurant", not "Vietnamese Restaurant". Adding filters for cuisine
        would filter out any of these un-categorised restaurants, so I decided
        to give it a miss.
      </p>
      <p>
        It would be somewhat interesting to pump the list of thousands of
        restaurant names through an LLM and have it attempt to categorise the
        cuisine though.
      </p>
      <h2>Pricing</h2>
      <p>
        Similarly, I think the pricing information for restaurants is collected
        from user ratings, and user submissions of price data. Consequently,
        restaurants without lots of reviews just have no price guide, so
        filtering to include only inexpensive restaurants will give you a
        limited subset of restaurants than you might expect to see.
      </p>
      <p>
        To show what I mean, here is what pricing category restaurants belong
        to:
      </p>
      <Image
        src={price}
        alt="A bar graph showing how many restaurants belong to each of the 4 price levels, and how many are uncategorised. The largest bar is uncategorised."
        width={800}
        height={500}
      ></Image>
      <p>
        As you can see, most restaurants don't have a pricing category. Again,
        we're stuck.
      </p>
      <p>
        Seeing this, you might think: "Wow, there are only 4 VERY expensive
        restaurants in Brisbane? What an exclusive club! What are they?". What a
        great question from a remarkably intelligent - and good looking -
        reader, they are:
      </p>

      <ul>
        <li>
          <Link href="https://maps.google.com/?cid=3168209921596447782">
            Montrachet
          </Link>
        </li>
        <li>
          <Link href="https://maps.google.com/?cid=15477634611926325852">
            Agnes Restaurant
          </Link>
        </li>
        <li>
          <Link href="https://maps.google.com/?cid=2910829091859388569">
            SK Steak & Oyster
          </Link>
        </li>
        <li>
          <Link href="https://maps.google.com/?cid=3570103700835892828">
            OTTO Ristorante
          </Link>
        </li>
      </ul>
      <h2>The data I wish I could have</h2>
      <p>
        The visualisation I really wish I could make is some sort of "Brisbane's
        Best Restaurants Over the Years". Currently our table succumbs to this
        problem:
      </p>
      <p>
        "What if a Restaurant was really good in 2024, and has only good
        reviews, and then changes owners and drops in quality."
      </p>
      <p>
        Just looking at ratings and number of ratings doesn't give us any
        information about this, but if I knew the exact <i>time</i> of each
        review, you could use something like the{" "}
        <Link href="https://en.wikipedia.org/wiki/Glicko_rating_system">
          Glicko Rating System
        </Link>{" "}
        to create a leaderboard to view the best restaurants at any time in the
        past. Google intentionally makes it hard to get their precious
        user-generated content back out of their system and as such, it's
        impossible to get the exact timestamp of reviews out of Google (both
        legally and via scraping - yes I checked), even though they have it.
      </p>
      <p>
        If there was one extra piece of data I could get from Google, it would
        be a list of <code>("rating", "time")</code> values for every review for
        every restaurant.
      </p>
      <hr></hr>
      <p>
        If you want a quick and handy link to save with only the best
        restaurants table, go{" "}
        <Link href="/projects/brisbanes-best-restaurants/2025">here</Link>.
      </p>
    </article>
  );
}
