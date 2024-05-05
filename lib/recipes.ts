import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sizeOf from "image-size";
import { join } from "path";

const recipeDirectory = path.join(process.cwd(), "recipes");

export function getSortedRecipeData() {
  // Get file names under /recipes
  const fileNames = fs.readdirSync(recipeDirectory);
  const allRecipeData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(recipeDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id: id,
      title: matterResult.data.title,
      description: matterResult.data.description,
    };
  });
  // Sort recipes by date
  return allRecipeData.sort((a, b) => {
    if (a.title < b.title) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllRecipeIds() {
  const fileNames = fs.readdirSync(recipeDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

interface AllRecipeData {
  id: string;
  markdown: string;
  title: string;
  description: string;
  date: Date;
  imageSizes: Record<string, { width: number; height: number }>;
}

export async function getRecipeData(id: string): Promise<AllRecipeData> {
  const fullPath = path.join(recipeDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use some fancy regex I stole from the internet to get images
  const imageSizes: AllRecipeData["imageSizes"] = {};
  const iterator = matterResult.content.matchAll(/\!\[.*]\((.*)\)/g);
  let match: IteratorResult<RegExpMatchArray, any>;
  while (!(match = iterator.next()).done) {
    const [, src] = match.value;
    console.log(src);
    try {
      // Images are stored in `public`
      const { width, height } = sizeOf(join("public", src));
      imageSizes[src] = { width, height };
    } catch (err) {
      console.error(`Can’t get dimensions for ${src}:`, err);
    }
  }

  // Combine the data with the gray-matter and markdown
  return {
    id: id,
    markdown: matterResult.content,
    title: matterResult.data.title,
    description: matterResult.data.description,
    date: matterResult.data.date,
    imageSizes: imageSizes,
  };
}
