import {
  getSortedPostsData,
  getSortedCustomPostsData,
} from "../../../lib/posts";
import Card from "../../../components/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "A list of all blog posts I've made",
};

export default function Page() {
  const allPostsData = getSortedPostsData();
  const allCustomPostsData = getSortedCustomPostsData();

  const allPosts = [...allPostsData, ...allCustomPostsData];
  // Sort posts by date
  const sortedAllPosts = allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <>
      <section>
        <div className="max-w-6xl p-4 m-auto">
          <div className="mt-2 md:mt-4 font-bold text-3xl text-center">
            Blog
          </div>
          <div className="flex flex-col items-center mt-4 gap-4">
            {sortedAllPosts.map(({ id, date, title, description }) => (
              <Card
                title={title}
                description={description}
                link={`/blog/${id}`}
                date={date}
                key={id}
              ></Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
