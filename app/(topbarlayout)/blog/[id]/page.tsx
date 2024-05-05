import Date from "../../../../components/date";
import { getPostData, getSortedPostsData } from "../../../../lib/posts";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";

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
        <ReactMarkdown
          components={{
            img: (props) => {
              if (postData.imageSizes[props.src]) {
                const { width, height } = postData.imageSizes[props.src];
                return (
                  <Image
                    src={props.src}
                    alt={props.alt}
                    width={width}
                    height={height}
                  />
                );
              } else {
                return <img {...props} />;
              }
            },
          }}
          rehypePlugins={[remarkGfm]}
        >
          {postData.markdown}
        </ReactMarkdown>
      </article>
    </>
  );
}
