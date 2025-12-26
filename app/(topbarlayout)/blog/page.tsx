import {
  getSortedPostsData,
  getSortedCustomPostsData,
} from "../../../lib/posts";
import { Metadata } from "next";
import BlogList from "./BlogList";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "A list of all blog posts I've made",
};

const tagColors: Record<string, string> = {
  Travel: "bg-green-500",
  Programming: "bg-blue-500",
  Brisbane: "bg-red-500",
  Review: "bg-yellow-500",
  Japan: "bg-orange-500",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const params = await searchParams;
  const filterTag = params.tag;

  const allPostsData = getSortedPostsData();
  const allCustomPostsData = getSortedCustomPostsData();
  const allPosts = [...allPostsData, ...allCustomPostsData];

  const tagColor = filterTag ? tagColors[filterTag] || "bg-gray-500" : "";

  return (
    <section>
      <div className="max-w-6xl p-4 m-auto">
        <div className="mt-2 md:mt-4 font-bold text-3xl text-center">
          {filterTag ? (
            <div className="flex items-center justify-center gap-2">
              <span>Blog posts about:</span>
              <span
                className={`px-3 py-1 text-sm font-semibold text-white ${tagColor} rounded-full`}
              >
                {filterTag}
              </span>
            </div>
          ) : (
            "Blog"
          )}
        </div>

        {filterTag && (
          <div className="mt-4 text-center">
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
            >
              Remove filter
            </Link>
          </div>
        )}

        <BlogList
          allPosts={allPosts}
          filterTag={filterTag}
          tagColors={tagColors}
        />
      </div>
    </section>
  );
}
