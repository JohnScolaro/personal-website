import Image from "next/image";
import { Tangerine } from "next/font/google";
import {
  getNumSketchRankPhotos,
  getSketchRankMetaData,
} from "../../../../../../lib/sketch-rank/sketch-rank";
import StyledButton from "../../../../../../components/styled-button";

export async function generateMetadata({ params }) {
  const sketchRankMetaData = getSketchRankMetaData(params.year);
  const imageMeta = sketchRankMetaData[params.id];
  const title = `${imageMeta.title} | SketchRank ${params.year}`;

  return {
    title: title,
    description: imageMeta.description,
  };
}

// If loading a variable font, you don't need to specify the font weight
const tangerine = Tangerine({ subsets: ["latin"], weight: ["700"] });

export default function Page({
  params,
}: {
  params: { id: string; year: string };
}) {
  const numSketchRankPhotos = getNumSketchRankPhotos(params.year);

  if (!isParamValid(params.id, numSketchRankPhotos)) {
    return (
      <div className="text-2xl lg:text-4xl text-center mt-10">
        🚧 Page not found 🚧
      </div>
    );
  }

  const id = parseInt(params.id, 10);

  const metaData = getSketchRankMetaData(params.year);

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
        src={getImageSrcFromId(params.year, id)}
        alt={params.id}
        height={800}
        width={800}
      ></Image>
      <div className="flex justify-between">
        <StyledButton
          href={`/sketch-rank/${params.year}/results/${nextId.toString()}`}
        >
          Previous
        </StyledButton>
        <StyledButton
          href={`/sketch-rank/${params.year}/results/${previousId.toString()}`}
        >
          Next
        </StyledButton>
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

function getImageSrcFromId(year: string, id: number): string {
  return `/images/sketch-rank/${year}/${id.toString()}.jpg`;
}
