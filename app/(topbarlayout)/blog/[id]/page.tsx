import Date from "../../../../components/date";
import { getPostData, getSortedPostsData } from "../../../../lib/posts";

export async function generateMetadata({ params }) {
  const allPostData = getSortedPostsData();

  // Find the post with the matching id
  const matchingPost = allPostData.find((post) => post.id === params.id);

  return {
    title: matchingPost.title,
    description: matchingPost.description,
  };
}

export default async function Post({ params }) {
  const postData = await getPostData(params.id);

  return (
    <>
      <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto prose-img:max-w-xl prose-img:w-full">
        <h1 className="mb-1 lg:mb-1 text-center">{postData.title}</h1>
        <div className="text-center">
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </>
  );
}
