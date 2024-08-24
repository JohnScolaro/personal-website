import path from "path";
import fs from "fs";

// Define the function to count JPG files in a folder
export function getNumSketchRankPhotos(year: string): number {
  const fullPath = path.resolve(
    process.cwd(),
    "public",
    "images",
    "sketch-rank",
    year
  );

  // Read the contents of the folder
  const files = fs.readdirSync(fullPath);

  // Filter out only the JPG files
  const jpgFiles = files.filter((file) => path.extname(file) === ".jpg");

  // Return the total number of JPG files
  return jpgFiles.length;
}

interface SketchRankMetaData {
  [key: string]: {
    author: string;
    title: string;
    description: string;
  };
}

export function getSketchRankMetaData(year: string): SketchRankMetaData {
  // Read the JSON file synchronously
  const filePath = path.join(
    process.cwd(),
    "public",
    "images",
    "sketch-rank",
    year,
    "meta.json"
  );

  const metaJson = fs.readFileSync(filePath, "utf-8");
  const metaData = JSON.parse(metaJson);
  return metaData;
}
