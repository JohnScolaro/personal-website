import { getRecipeData, getSortedRecipeData } from "../../../../lib/recipes";

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

  return (
    <>
      <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto">
        <div dangerouslySetInnerHTML={{ __html: recipeData.contentHtml }} />
      </article>
    </>
  );
}
