import Image from "next/image";
import fs from "fs";
import path from "path";
import { Tangerine } from "next/font/google";
import ResultsTable from "../resultsTable";

// If loading a variable font, you don't need to specify the font weight
const tangerine = Tangerine({ subsets: ["latin"], weight: ["700"] });

export default function Page({ params }: { params: { id: string } }) {
  const imageSrc = `/images/sketch-rank/${params.id}.png`;

  // Read the JSON file synchronously
  const filePath = path.join(
    process.cwd(),
    "public/images/sketch-rank/meta.json"
  );

  const metaJson = fs.readFileSync(filePath, "utf-8");
  const metaData = JSON.parse(metaJson);

  var title = "";
  var description = "";
  var author = "";

  if (params.id.toString() in metaData) {
    const imageSpecificMetaData = metaData[params.id.toString()];
    title = imageSpecificMetaData["title"];
    description = imageSpecificMetaData["description"];
    author = imageSpecificMetaData["author"];
  }

  return (
    <div className="flex flex-col gap-4 p-4 items-center">
      <Image
        className="m-auto"
        src={imageSrc}
        alt={params.id}
        height={800}
        width={800}
      ></Image>
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
