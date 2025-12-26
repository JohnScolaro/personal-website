import type { Metadata } from "next";
import Date from "../../../../components/date";
import Image from "next/image";
import Link from "next/link";

// Pre-processed data for showing static plots.
import australia_vs_other from "./australia_vs_other.json";
import how_many_people_finished_their_races from "./how_many_people_finished_their_races.json";
import most_popular_names from "./most_popular_names.json";
import number_of_participants_in_each_event from "./number_of_participants_in_each_event.json";
import other_countries_breakdown from "./other_countries_breakdown.json";
import race_result_by_event_type from "./race_result_by_event_type.json";

import CustomFilteredPlotlyChart from "./special-client-side-filtering-component";
import PlotlyChart from "../../../../components/wrapped-plotly-chart";

// Images
import news_article_image from "./news_article.png";
import ackshually_image from "./ackshually.png";

export const metadata: Metadata = {
  title: "Sunshine Coast Marathon Festival 2024 - Results",
  description:
    "A visualisation of the race results of the 2024 Sunshine Coast Marathon Festival.",
};

export default function Page() {
  return (
    <>
      <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto prose-img:max-w-xl prose-img:w-full">
        <h1 className="mb-1 lg:mb-1 text-center">
          Sunshine Coast Marathon Festival 2024
        </h1>
        <div className="text-center">
          <Date dateString={"2024-08-17"} />
        </div>
        <h2>Introduction</h2>
        <p>
          Running event result websites never show all the cool statistics you
          want. They tend to show paginated tables of all finishers, with an
          ability to search for yourself and that's about it. Luckily for us,
          these tables lend themselves to being easily scraped, so I wrote a
          quick{" "}
          <Link
            href={
              "https://github.com/JohnScolaro/sunshine-coast-marathon-result-scraper"
            }
          >
            little script
          </Link>{" "}
          to download the results of the entire marathon festival. Let's see
          what interesting information we can glean from the results!
        </p>
        <p>
          I know what everyone's most interested in is: "How do I stack up
          compared to the rest?", so let's get that out of the way first.
        </p>
        <h2>Performance</h2>
        <p>Use the filters below to see how you stack up:</p>
        <CustomFilteredPlotlyChart />
        <p>
          I'd love it if road race and triathlon events showed histograms like
          this. Now that we've looked at performance, let's look at some general
          race stats.
        </p>
        <h2>Race Participation</h2>
        <p>Let's take a look at how many people entered each event.</p>
        <PlotlyChart
          data={number_of_participants_in_each_event.data}
          layout={number_of_participants_in_each_event.layout}
          config={{ responsive: true, displayModeBar: false }}
        />
        <p>
          The Sunshine Coast Marathon Festival reported record breaking numbers
          over the weekend with news outlets reporting: "A record breaking
          12,000 participants".
        </p>
        <Image
          src={news_article_image}
          alt={"A screenshot of a news article claiming 12,000 participants."}
          width={376}
          height={117}
        ></Image>
        <p>
          As we can see, this is almost correct but I'm only seeing 11,635
          results, so I'm going to have to fact check the OurSC news outlet on
          that one. Nevertheless, this is still an excellent turnout.
        </p>
        <Image
          src={ackshually_image}
          alt={
            "A meme of a nerdy man saying: 'Achshually' there are only 11,635 entrants'."
          }
          width={483}
          height={424}
        ></Image>
        <p>Let's take a look at the race outcomes of all these entrants.</p>
        <PlotlyChart
          data={how_many_people_finished_their_races.data}
          layout={how_many_people_finished_their_races.layout}
          config={{ responsive: true, displayModeBar: false }}
        />
        <p>
          Of the 11,635 participants, most of them finished their respective
          events normally. We can see a whopping 1,703 participants in either
          the "Not Started" and "DNS" categories. Why these are different
          categories I don't know, but I'd guess they come from different
          recording mechanisms. Perhaps 1692 people didn't pick up their race
          bib, but then a further 11 who did pick up their gear still didn't
          show up to their race. If we assume that the average ticket cost was
          ~$100, (some races cost more, others cost less) then we can assume
          that the race made $169,200 from people who didn't even run!
        </p>
        <p>
          Also we can see the 156 DNF's, which is remarkably low really, showing
          that if you start your race, you have only a ~1.5% chance of not
          finishing it.
        </p>
        <p>
          {" "}
          I wonder how these rates change depending on which race you entered...
        </p>
        <PlotlyChart
          data={race_result_by_event_type.data}
          layout={race_result_by_event_type.layout}
          config={{ responsive: true, displayModeBar: false }}
        />
        <p>
          Now that we're looking at the individual events, we can see that if
          you ran the marathon, there is actually a 4.6% chance that you would
          have dropped out, but for all other lengths, it was less than 1%. We
          can also see that the rate of disqualifications is significantly lower
          for all non-marathon events. This makes sense since the entire
          festival is centered around the marathon.
        </p>
        <h2>Where did everyone come from?</h2>
        <p>
          On the results website, it shows us the country that each entrant has
          signed up from. I'd expect that almost everyone will have entered as
          Australia given the Sunshine Coast Marathon is more of a smaller
          less-international event compared to the Elite Label Gold Coast
          Marathon just down the road.
        </p>
        <PlotlyChart
          data={australia_vs_other.data}
          layout={australia_vs_other.layout}
          config={{ responsive: true, displayModeBar: false }}
        />
        <p>
          We can see that almost 2% of race entrants registered under countries
          other than Australia. Here is the breakdown of where the
          non-Australian atheletes came from:
        </p>
        <PlotlyChart
          data={other_countries_breakdown.data}
          layout={other_countries_breakdown.layout}
          config={{ responsive: true, displayModeBar: false }}
        />
        <p>
          We have great representation from a large number of countries. The way
          I determine an athlete's country is by looking at the flag displayed
          on the website. The flags seem to use ISO 3166-1 2 letter country
          codes (For example, "AU" = "Australia") which lets me link them to a
          country. There are still 2 athletes who have a blank country in the
          data. I wonder if these athletes somehow managed to register without a
          country, or if they registered with a country that doesn't have a
          valid ISO code. I suppose the question: "How many countries are
          there?" is actually very contentious with no consensus between
          governments worldwide, so it makes sense that we can run into an edge
          case like this.
        </p>
        <h2>Random</h2>
        <p>
          The race results also include everyones names, but I've been
          intentionally avoiding doing too much with names, because people get a
          little icky about using personal information, but here are the top 10
          most common entrant names and gender, just out of curiousity.
        </p>
        <PlotlyChart
          data={most_popular_names.data}
          layout={most_popular_names.layout}
          config={{ responsive: true, displayModeBar: false }}
        />{" "}
      </article>
    </>
  );
}
