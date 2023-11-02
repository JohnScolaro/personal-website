import { getSortedPostsData } from "../../../lib/posts";
import Card from "../../../components/card";

export default function Page() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <section>
        <div className="max-w-6xl p-4 m-auto">
          <div className="mt-2 md:mt-4 font-bold text-3xl text-center">
            Blog
          </div>
          <div className="flex flex-col items-center mt-4 gap-4">
            {allPostsData.map(({ id, date, title, description }) => (
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
