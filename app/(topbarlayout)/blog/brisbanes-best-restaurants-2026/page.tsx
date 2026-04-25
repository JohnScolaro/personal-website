import type { Metadata } from "next";
import Link from "next/link";
// import RestaurantTable from "../../projects/brisbanes-best-restaurants/2025/RestaurantTable";
import Date from "../../../../components/date";
import Image from "next/image";

// Pre-processed data for showing static plots.
// import scatter_plot_1 from "./scatter_plot_rating_vs_reviews.json";

// Images
// import already_done from "./already_done.png";

export const metadata: Metadata = {
  title: "Brisbane's Best Restaurants - 2026",
  description:
    "Discover Brisbane's top restaurants for 2026, ranked using real data. Find Brisbane's hidden gems here.",
  openGraph: {
    title: "Brisbane's Best Restaurants - 2026",
    description:
      "Discover Brisbane's top restaurants for 2026, ranked using real data. Find Brisbane's hidden gems here.",
    url: "https://johnscolaro.xyz/blog/brisbanes-best-restaurants-2026",
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
    <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto prose-img:max-w-xl prose-img:w-full">
      <h1 className="mb-1 lg:mb-1 text-center">
        Brisbane's Best Restaurants - 2026
      </h1>
      <div className="text-center">
        <Date dateString={"2026-04-12"} />
      </div>
      <p>blah blah blah blah blah</p>
      {/* <Image
        src={tirimisu}
        alt="A screenshot of a comment on hackernews saying this has already been done."
        width={1075}
        height={1423}
      ></Image> */}
    </article>
  );
}
