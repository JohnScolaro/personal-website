import { getRecipeData, getSortedRecipeData } from "../../../../lib/recipes";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";

export async function generateMetadata({ params }) {
  const allRecipeData = getSortedRecipeData();

  // Find the recipe with the matching id
  const matchingRecipe = allRecipeData.find(
    (recipe) => recipe.id === params.id
  );

  return {
    title: matchingRecipe.title,
    description: matchingRecipe.description,
  };
}

export default async function Post({ params }) {
  const recipeData = await getRecipeData(params.id);
  console.log(recipeData.imageSizes);

  return (
    <>
      <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto">
        <ReactMarkdown
          components={{
            img: (props) => {
              if (recipeData.imageSizes[props.src]) {
                const { width, height } = recipeData.imageSizes[props.src];
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
          {recipeData.markdown}
        </ReactMarkdown>
      </article>
    </>
  );
}
