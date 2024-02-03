import Image from "next/image";
import fs from "fs";
import path from "path";
import { Tangerine } from "next/font/google";
import {
  getNumSketchRankPhotos,
  getSketchRankMetaData,
} from "../../../../../lib/sketch-rank/sketch-rank";
import WrappedAwesomeButton from "../../../../../components/wrapped-awesome-button";

// If loading a variable font, you don't need to specify the font weight
const tangerine = Tangerine({ subsets: ["latin"], weight: ["700"] });

export default function Page({ params }: { params: { id: string } }) {
  const numSketchRankPhotos = getNumSketchRankPhotos();

  if (!isParamValid(params.id, numSketchRankPhotos)) {
    return (
      <div className="text-2xl lg:text-4xl text-center mt-10">
        🚧 Page not found 🚧
      </div>
    );
  }

  const id = parseInt(params.id, 10);

  const metaData = getSketchRankMetaData();

  var title = "";
  var description = "";
  var author = "";

  if (id.toString() in metaData) {
    const imageSpecificMetaData = metaData[id.toString()];
    title = imageSpecificMetaData["title"];
    description = imageSpecificMetaData["description"];
    author = imageSpecificMetaData["author"];
  }

  const [nextId, previousId] = getNextAndPreviousImages(
    id,
    numSketchRankPhotos
  );

  return (
    <div className="flex flex-col gap-4 p-4 items-stretch">
      <Image
        className="m-auto"
        src={getImageSrcFromId(id)}
        alt={params.id}
        height={800}
        width={800}
      ></Image>
      <div className="flex justify-between">
        <WrappedAwesomeButton
          href={`/sketch-rank/results/${previousId.toString()}`}
        >
          Previous
        </WrappedAwesomeButton>
        <WrappedAwesomeButton
          href={`/sketch-rank/results/${nextId.toString()}`}
        >
          Next
        </WrappedAwesomeButton>
      </div>
      <div className="border-2 border-gray-300 rounded-lg p-4 mt-8">
        <div
          className={`${tangerine.className} text-6xl lg:text-8xl text-center`}
        >
          "{title}"
        </div>
        <div
          className={`${tangerine.className} text-2xl lg:text-6xl text-center mt-4`}
        >
          {description}
        </div>
        <div className="text-center mt-2">Drawn by: {author}</div>
      </div>
    </div>
  );
}

function isParamValid(id: string, totalPhotos: number): boolean {
  // Use parseInt to attempt conversion
  const parsedId = parseInt(id, 10);
  // Return false if the conversion was unsuccessful and the parsed value is NaN.
  if (isNaN(parsedId)) {
    return false;
  }

  return parsedId >= 0 && parsedId < totalPhotos;
}

function getNextAndPreviousImages(
  id: number,
  totalPhotos: number
): [number, number] {
  if (id == 0) {
    return [1, totalPhotos - 1];
  } else if (id == totalPhotos - 1) {
    return [0, totalPhotos - 2];
  } else {
    return [id + 1, id - 1];
  }
}

function getImageSrcFromId(id: number): string {
  return `/images/sketch-rank/${id.toString()}.jpg`;
}
