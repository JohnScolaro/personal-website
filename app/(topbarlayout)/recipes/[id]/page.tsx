import { getRecipeData, getSortedRecipeData } from "../../../../lib/recipes";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const allRecipeData = getSortedRecipeData();

  // Find the recipe with the matching id
  const matchingRecipe = allRecipeData.find(
    (recipe) => recipe.id === resolvedParams.id
  );

  if (!matchingRecipe) {
    return { title: "not found", description: "not found" };
  }

  return {
    title: matchingRecipe.title,
    description: matchingRecipe.description,
  };
}

export default async function Post({ params }) {
  const resolvedParams = await params;
  const recipeData = await getRecipeData(resolvedParams.id);

  if (!recipeData) {
    return <h1>Recipe Not Found</h1>;
  }

  return (
    <>
      <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto">
        <ReactMarkdown
          components={{
            img: (props) => {
              const src = props.src as string;
              if (src && recipeData.imageSizes[src]) {
                const { width, height } = recipeData.imageSizes[src];
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
          rehypePlugins={[rehypeRaw, remarkGfm]}
        >
          {recipeData.markdown}
        </ReactMarkdown>
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const allRecipeData = getSortedRecipeData();

  return allRecipeData.map((post) => ({
    id: post.id,
  }));
}
