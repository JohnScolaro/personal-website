import ImageCompetition from "./imageCompetition";
import Link from "next/link";
import type { Metadata } from "next";
import { getNumSketchRankPhotos } from "../../../lib/sketch-rank/sketch-rank";

export const metadata: Metadata = {
  title: "SketchRank",
  description: "Rank several sketches that my partner and I drew",
};

export default function Page() {
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
          <Link className="hyperlink" href={"/sketch-rank/results"}>
            here
          </Link>
          ✨
        </p>
        <div className="h-6"></div>
        <ImageCompetition
          numImages={getNumSketchRankPhotos()}
        ></ImageCompetition>
      </div>
    </>
  );
}
