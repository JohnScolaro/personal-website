import Image from "next/image";
import Card from "../components/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "John Scolaro",
  description: "The homepage for John Scolaro's personal website",
  openGraph: {
    title: "John Scolaro",
    description: "The homepage for John Scolaro's personal website",
    url: "https://johnscolaro.xyz",
    images: [
      {
        url: "https://johnscolaro.xyz/images/preview_images/preview.png",
        width: 1200,
        height: 630,
        alt: "John Scolaro's Website Preview",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <div className="relative bg-white h-screen overflow-auto">
        <div className="w-[80%] m-auto text-center">
          <div className="flex justify-center">
            <Image
              src={"/images/profile.jpg"}
              alt={
                "A suave profile photo. If the photo doesn't load, just imagine that I'm really handsome."
              }
              height={200}
              width={200}
              className="rounded-full mt-8 md:mt-16 w-28 sm:w-36 md:w-max"
              priority={true}
            ></Image>
          </div>
          <section>
            <h1 className="text-4xl xl:text-6xl font-bold z-10 mt-6 md:mt-10">
              John Scolaro
            </h1>
          </section>
        </div>
        <div className="flex justify-center m-auto max-w-5xl">
          <div className="flex justify-around flex-wrap mx-6 gap-6 my-10 sm:my-14">
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
              title="Links"
              description="Some of my other profiles"
              link="/links"
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
