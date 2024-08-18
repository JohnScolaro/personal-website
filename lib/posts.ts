import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sizeOf from "image-size";
import { join } from "path";

const postsDirectory = path.join(process.cwd(), "posts");

type PostData = {
  id: string;
  date: string;
  title: string;
  description: string;
};

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id: id,
      date: matterResult.data.date,
      title: matterResult.data.title,
      description: matterResult.data.description,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getSortedCustomPostsData(): PostData[] {
  return [
    {
      id: "sunshine-coast-marathon-2024",
      date: "2024-08-17",
      title: "Sunshine Coast Marathon Festival 2024 Results",
      description:
        "A visualisation of the results from the Sunshine Coast Marathon 2024",
    },
  ];
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

interface AllPostData {
  id: string;
  markdown: string;
  date: Date;
  title: string;
  imageSizes: Record<string, { width: number; height: number }>;
}

export async function getPostData(id: string): Promise<AllPostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use some fancy regex I stole from the internet to get images
  const imageSizes: AllPostData["imageSizes"] = {};
  const iterator = matterResult.content.matchAll(/\!\[.*]\((.*)\)/g);
  let match: IteratorResult<RegExpMatchArray, any>;
  while (!(match = iterator.next()).done) {
    const [, src] = match.value;
    try {
      // Images are stored in `public`
      const { width, height } = sizeOf(join("public", src));
      imageSizes[src] = { width, height };
    } catch (err) {
      console.error(`Can’t get dimensions for ${src}:`, err);
    }
  }

  // Combine the data with the id and the markdown
  return {
    id: id,
    markdown: matterResult.content,
    title: matterResult.data.title,
    date: matterResult.data.date,
    imageSizes: imageSizes,
  };
}
