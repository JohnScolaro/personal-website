import Head from "next/head";
import Card from "../components/card";

const siteTitle = "John's Website";

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="relative bg-white h-screen overflow-hidden">
        <div className="h-10 sm:h-14 xl:h-20"></div>
        <div className="w-[80%] m-auto text-center">
          <section>
            <h1 className="text-4xl xl:text-6xl font-bold z-10">
              John Scolaro
            </h1>
          </section>
        </div>
        <div className="h-10 sm:h-14 xl:h-24"></div>
        <div className="flex justify-center">
          <div className="flex justify-around flex-wrap w-[80%] gap-6">
            <Card
              title="Blog"
              description="Sometimes I write things down"
              link="/blog"
            ></Card>
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
              title="Recipes"
              description="Ol' Scolaro Family Recipes"
              link="/recipes"
            ></Card>
            <Card
              title="Resume"
              description="Things I've done"
              link="/resume"
            ></Card>
            <Card
              title="Contact"
              description="Please"
              link="mailto:johnscolaro95@gmail.com"
            ></Card>
          </div>
        </div>
      </div>
    </>
  );
}
