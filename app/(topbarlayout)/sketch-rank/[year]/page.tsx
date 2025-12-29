import ImageCompetition from "./imageCompetition";
import Link from "next/link";
import { getNumSketchRankPhotos } from "../../../../lib/sketch-rank/sketch-rank";
import { getAllSketchRankYears } from "../utils";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const year = resolvedParams?.year;

  if (!year) {
    return {
      title: "SketchRank",
      description: "Rank several sketches that my partner and I drew.",
    };
  }

  return {
    title: `SketchRank ${year}`,
    description: "Rank several sketches that my partner and I drew.",
    openGraph: {
      title: `SketchRank ${year}`,
      description: "Rank several sketches that my partner and I drew.",
      url: `https://johnscolaro.xyz/sketch-rank/${year}`,
      images: [
        {
          url: `/images/preview_images/sketch_rank_${year}.png`,
          width: 1200,
          height: 624,
          alt: `A little silly doodle saying: Sketch Rank ${resolvedParams.year}`,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const year = resolvedParams?.year;

  if (!params) {
    return notFound();
  }

  return (
    <>
      <div className="max-w-6xl p-4 m-auto">
        <div className="mt-2 md:mt-4 font-bold text-3xl text-center">
          Sketch Rank
        </div>
        <h2 className="font-bold mt-4">What?</h2>
        <p>
          Every night before bed, instead of scrolling endlessly on our devices,
          my partner and I draw a small sketch. There is a loose time limit of
          approximately 5 minutes, so the quality isn't particularly high. I
          decided to put all the images online and let the public rank them
          against each other. It'll be interesting to see which drawings come
          out on top.
        </p>
        <h2 className="font-bold mt-4">How?</h2>
        <p>
          Click on the image you like the most! When you've tired yourself out,
          scroll to the bottom to see the results.
        </p>
        <h2 className="font-bold mt-4">Results?</h2>
        <p>
          Interested in checking out the winners? Click ✨
          <Link className="hyperlink" href={`/sketch-rank/${year}/results`}>
            here
          </Link>
          ✨
        </p>
        <div className="h-6"></div>
        <ImageCompetition
          year={year}
          numImages={getNumSketchRankPhotos(year)}
        ></ImageCompetition>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const allSketchRankYears = getAllSketchRankYears();

  return allSketchRankYears.map((year) => ({
    year: year,
  }));
}
