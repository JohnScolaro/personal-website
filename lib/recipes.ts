import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

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
  contentHtml: string;
  date: Date;
  title: string; // Add any other properties you expect to return
  // Add any other properties you expect to return
}

export async function getRecipeData(id: string): Promise<AllRecipeData> {
  const fullPath = path.join(recipeDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(gfm) // Add the remark-gfm plugin
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id: id,
    contentHtml: contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
  };
}
