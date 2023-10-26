import ImageCompetition from "./imageCompetition";
import WrappedAwesomeButton from "../../components/wrapped-awesome-button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="max-w-6xl p-4 m-auto">
        <div className="mt-2 md:mt-4 font-bold text-3xl text-center">
          Sketch Rank
        </div>
        <h1 className="font-bold mt-4">What is this?</h1>
        <p>
          Every night before bed, instead of scrolling endlessly on our devices,
          my partner and I draw a small sketch. There is a loose time limit of
          approximately 5 minutes, so the quality isn't particularly high. I
          decided to put all the images online and let the public rank them
          against each other. It'll be interesting to see which drawings come
          out on top.
        </p>
        <div className="h-6"></div>
        <div className="font-bold">Click on the image you like the most:</div>
        <div className="h-6"></div>
        <ImageCompetition numImages={88} />
        <div className="h-6"></div>
        <Link href={"/sketch-rank/results"}>
          <WrappedAwesomeButton type="primary">
            Take me to the results!
          </WrappedAwesomeButton>
        </Link>
      </div>
    </>
  );
}
