import type { Metadata } from "next";
import Date from "../../../../../components/date";
import Link from "next/link";
import RestaurantTable from "../components/RestaurantTable";
import data_2026 from "../data/2026.json";

export const metadata: Metadata = {
  title: "Brisbane's Best Restaurants - 2026",
  description:
    "Discover Brisbane's top restaurants for 2026, ranked using thousands of reviews. Find Brisbane's hidden gems here.",
  openGraph: {
    title: "Brisbane's Best Restaurants - 2026",
    description:
      "Discover Brisbane's top restaurants for 2026, ranked using thousands of reviews. Find Brisbane's hidden gems here.",
    url: "https://johnscolaro.xyz/projects/brisbanes-best-restaurants/2026",
    images: [
      {
        url: "https://johnscolaro.xyz/images/preview_images/brisbanes-best-restaurants-2026.png",
        width: 1200,
        height: 624,
        alt: "An image of text saying: 'Brisbanes Best Restaurant 2026'",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto prose-img:max-w-xl prose-img:w-full">
        <h1 className="mb-1 lg:mb-1 text-center">
          Brisbane's Best Restaurants 2026
        </h1>
        <div className="text-center">
          <Date dateString={"2026-04-25"} />
        </div>
        <RestaurantTable data={data_2026} />
        <p>
          This is my ranking of all the restaurants in Brisbane. I was initially
          inspired by{" "}
          <Link
            href={
              "https://mattsayar.com/where-are-the-best-restaurants-in-my-city-a-statistical-analysis/"
            }
          >
            this post
          </Link>
          , to use{" "}
          <Link
            href={
              "https://developers.google.com/maps/documentation/places/web-service/op-overview"
            }
          >
            Google's API
          </Link>
          , and an{" "}
          <Link
            href={
              "https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Wilson_score_interval"
            }
          >
            algorithm
          </Link>
          , to find a good place to eat. If you'd like to see more statistics
          and read some more about how I made this{" "}
          <Link href={"/blog/brisbanes-best-restaurants-2026"}>click here</Link>
          .
        </p>
      </article>
    </>
  );
}
