import Head from "next/head";
import Card from "../components/card";

const siteTitle = "John's Website";

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>Hi, I'm John!</p>
        <p>This is my website.</p>
      </section>
      <div className="flex justify-center">
        <div className="flex justify-around flex-wrap max-w-4xl gap-4">
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
            description="Rank sketches drawn by my partner and I"
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
        </div>
      </div>
    </>
  );
}
