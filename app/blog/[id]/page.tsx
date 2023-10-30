import Date from "../../../components/date";
import { getPostData } from "../../../lib/posts";
import style from "./markdownStyles.module.css";

export default async function Post({ params }) {
  const postData = await getPostData(params.id);
  console.log(style);

  return (
    <>
      <article
        className="flex flex-col items-center mx-auto md:mt-10 mb-auto max-w-4xl p-4"
        style={style}
      >
        <h1 className="text-center text-2xl md:text-3xl font-bold">
          {postData.title}
        </h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <div
          className="mt-4"
          style={style}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </>
  );
}
