import { getNumSketchRankPhotos } from '../lib/sketch-rank/sketch-rank'
import { getSortedPostsData } from "../lib/posts";
import { getSortedRecipeData } from "../lib/recipes";
import {getAllSketchRankYears} from "./(topbarlayout)/sketch-rank/utils";

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

  const sketchRankRoutes = ["/sketch-rank"];
  const sketchRankYears = await getAllSketchRankYears();
  for (const year of sketchRankYears) {
    sketchRankRoutes.push(`/sketch-rank/${year}`);
    sketchRankRoutes.push(`/sketch-rank/${year}/results`);

    let i = 0;
    while (i < getNumSketchRankPhotos(year)) {
      sketchRankRoutes.push(`/sketch-rank/${year}/results/${i.toString()}`);
      i++;
    }
  }

  const customProjectRoutes = [
    "/projects/brisbanes-best-restaurants/2025",
    "/projects/so-you-think-you-know-brisbane",
    "/projects/uber-eats-visualiser"
  ];
  
  const allRoutes = [...routes, ...allBlogRoutes, ...allRecipeRoutes, ...customProjectRoutes, ...sketchRankRoutes].map((route) => ({
    url: `${URL}${route}`,
  }));
 
  return allRoutes;
}
