import { getNumSketchRankPhotos } from '../lib/sketch-rank/sketch-rank'
import { getSortedPostsData } from "lib/posts";
import { getSortedRecipeData } from "lib/recipes";

export default async function sitemap() {
  const URL = "https://johnscolaro.xyz";

  // Other pages of the website.
  const routes = ["" , "/resume", "/links"];

  // Fetch posts data and generate routes
  const postsData = getSortedPostsData();
  const blogRoutes = postsData.map(post => `/blog/${post.id}`);
  const allBlogRoutes = ["/blog", ...blogRoutes];

  // Fetch recipe data and generate routes
  const recipeData = getSortedRecipeData();
  const recipeRoutes = recipeData.map(recipe => `/recipes/${recipe.id}`);
  const allRecipeRoutes = ["/recipes", ...recipeRoutes];

  const sketchRankRoutes = ["/sketch-rank", "/sketch-rank/results"];
  let i = 0;
  while (i < getNumSketchRankPhotos()) {
    sketchRankRoutes.push(`/sketch-rank/results/${i.toString()}`)
    i++;
  }
  
  const allRoutes = [...routes, ...allBlogRoutes, ...allRecipeRoutes, ...sketchRankRoutes].map((route) => ({
    url: `${URL}${route}`,
  }));
 
  return allRoutes;
}
