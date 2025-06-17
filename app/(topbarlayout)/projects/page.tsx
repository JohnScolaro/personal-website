import Card from "../../../components/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A subpage to contain a list of all the personal projects I've worked on over the years.",
  openGraph: {
    title: "Projects",
    description:
      "A subpage to contain a list of all the personal projects I've worked on over the years.",
    url: "https://johnscolaro.xyz/projects",
    images: [
      {
        url: "https://johnscolaro.xyz/images/preview_images/projects.png",
        width: 1200,
        height: 630,
        alt: "Project Subpage Preview",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <div className="relative bg-white h-screen overflow-auto">
        <div className="flex justify-center m-auto max-w-5xl">
          <div className="flex justify-around flex-wrap mx-6 gap-6 my-10 sm:my-14">
            <Card
              title="Active Statistics"
              description="Visualise your Strava Statistics"
              link="https://active-statistics.com"
            ></Card>
            <Card
              title="Sketch Rank"
              description="Rank sketches my partner and I drew"
              link="/sketch-rank"
            ></Card>
            <Card
              title="So you think you know Brisbane"
              description="Do you know all Brisbane's Suburbs?"
              link="/projects/so-you-think-you-know-brisbane"
            ></Card>
            <Card
              title="Brisbane's Best Restaurants"
              description="The results of a project to find Brisbane's Best Restaurants."
              link="/projects/brisbanes-best-restaurants/2025"
            ></Card>
            <Card
              title="Uber Eats Data Visualiser"
              description="Visualise your personal Uber Eats data."
              link="/projects/uber-eats-visualiser"
            ></Card>
          </div>
        </div>
      </div>
    </>
  );
}
