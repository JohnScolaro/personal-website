import Date from "../../../../components/date";
import { getPostData } from "../../../../lib/posts";

export default async function Post({ params }) {
  const postData = await getPostData(params.id);

  return (
    <>
      <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto">
        <h1 className="mb-1 lg:mb-1 text-center">{postData.title}</h1>
        <div className="text-center">
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </>
  );
}
