import path from "path";
import fs from "fs";

// Define the function to count PNG files in a folder
export function getNumSketchRankPhotos(): number {
  const fullPath = path.resolve(
    process.cwd(),
    "public",
    "images",
    "sketch-rank"
  );

  // Read the contents of the folder
  const files = fs.readdirSync(fullPath);

  // Filter out only the PNG files
  const pngFiles = files.filter((file) => path.extname(file) === ".png");

  // Return the total number of PNG files
  return pngFiles.length;
}

interface SketchRankMetaData {
  [key: string]: {
    author: string;
    title: string;
    description: string;
  };
}

export function getSketchRankMetaData(): SketchRankMetaData {
  // Read the JSON file synchronously
  const filePath = path.join(
    process.cwd(),
    "public",
    "images",
    "sketch-rank",
    "meta.json"
  );

  const metaJson = fs.readFileSync(filePath, "utf-8");
  const metaData = JSON.parse(metaJson);
  return metaData;
}
