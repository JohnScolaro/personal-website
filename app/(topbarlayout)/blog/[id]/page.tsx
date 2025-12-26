import Date from "../../../../components/date";
import { getPostData, getSortedPostsData } from "../../../../lib/posts";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { Metadata } from "next";
import path from "path";
import fs from "fs";
import sizeOf from "image-size";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const postData = await getPostData(id);

  const imagePath = path.join(
    process.cwd(),
    "public",
    "images",
    "preview_images",
    `${postData.id}.png`
  );

  let images;

  if (fs.existsSync(imagePath)) {
    const dimensions = sizeOf(imagePath);
    images = [
      {
        url: `https://johnscolaro.xyz/images/preview_images/${postData.id}.png`,
        width: dimensions.width,
        height: dimensions.height,
        alt: "An image of John and Helen",
      },
    ];
  }

  return {
    title: postData.title,
    description: postData.description,
    openGraph: {
      title: postData.title,
      description: postData.description,
      url: `https://johnscolaro.xyz/${postData.id}`,
      ...(images && { images }),
    },
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postData = await getPostData(id);

  return (
    <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto prose-img:max-w-xl prose-img:w-full prose-code:leading-5 prose-pre:p-0 prose-code:before:content-none prose-code:after:content-none">
      <h1 className="mb-1 lg:mb-1 text-center">{postData.title}</h1>
      <div className="text-center">
        <Date dateString={postData.date} />
      </div>

      <ReactMarkdown
        components={{
          img: (props) => {
            const src = props.src as string;
            if (src && postData.imageSizes[src]) {
              const { width, height } = postData.imageSizes[src];
              return (
                <Image
                  src={src!}
                  alt={props.alt!}
                  width={width}
                  height={height}
                />
              );
            } else {
              return <img {...props} />;
            }
          },
        }}
        rehypePlugins={[rehypeRaw, remarkGfm, rehypeHighlight]}
      >
        {postData.markdown}
      </ReactMarkdown>
    </article>
  );
}

export async function generateStaticParams() {
  const allPostData = getSortedPostsData();

  return allPostData.map((post) => ({
    id: post.id,
  }));
}
