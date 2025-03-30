import type { Metadata } from "next";
import Date from "../../../../../components/date";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import RestaurantTable from "./RestaurantTable";

// Pre-processed data for showing static plots.
import processed_restaurant_data from "./processed_restaurants.json";
// import plotly_chart_data from "./example_plotly_chart.json";

// Images
import news_article_image from "./news_article.png";
import ackshually_image from "./ackshually.png";

export const metadata: Metadata = {
    title: "Brisbane's Best Restaurants - 2025",
    description:
        "I do some data analysis to find Brisbane's best restaurants.",
};
import dynamic from "next/dynamic";

export default function Page() {
    return (
        <>
            <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto prose-img:max-w-xl prose-img:w-full">
                <h1 className="mb-1 lg:mb-1 text-center">
                    Brisbane's Best Restaurants 2025
                </h1>
                <div className="text-center">
                    <Date dateString={"2025-03-30"} />
                </div>
                <h2>Introduction</h2>
                <p>This is my ranking of all the restaurants in Brisbane. I was inspired by <Link href={"https://mattsayar.com/where-are-the-best-restaurants-in-my-city-a-statistical-analysis/"}>this post</Link>, to use <Link href={"https://developers.google.com/maps/documentation/places/web-service/op-overview"}>Google's API</Link>, and an <Link href={"https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Wilson_score_interval"}>algorithm</Link>, to find a good place to eat. If you'd like to see more statistics and read some more about how I made this <Link href={"/blog/brisbanes-best-restaurants"}>click here</Link>.</p>
                <RestaurantTable />
            </article>
        </>
    );
}

