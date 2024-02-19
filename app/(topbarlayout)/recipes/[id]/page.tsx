import { getRecipeData } from "../../../../lib/recipes";

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
