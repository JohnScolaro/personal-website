import {getNumSketchRankPhotos} from '../lib/sketch-rank/sketch-rank'

export default async function sitemap() {
  const URL = "https://johnscolaro.xyz";

  // Other pages of the website.
  const routes = ["", "/recipes", "/resume"];

  // I'm just going to manually add blog routes until I can be bothered generating it automatically.
  const blogRoutes = ["/blog", "/blog/first-post", "/blog/aws-multiple-subdomains"];

  const sketchRankRoutes = ["/sketch-rank", "/sketch-rank/results"];
  let i = 0;
  while (i < getNumSketchRankPhotos()) {
    sketchRankRoutes.push(`/sketch-rank/results/${i.toString()}`)
    i++;
  }

  
  const allRoutes = [...routes, ...blogRoutes, ...sketchRankRoutes].map((route) => ({
    url: `${URL}${route}`,
  }));
 
  return allRoutes;
}
