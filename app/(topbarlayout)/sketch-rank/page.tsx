import Card from "../../../components/card";
import { Metadata } from "next";
import { getAllSketchRankYears } from "./utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "A list of all blog posts I've made",
};

export default function Page() {
  const allSketchRankYears = getAllSketchRankYears();

  return (
    <>
      <section>
        <div className="max-w-6xl p-4 m-auto">
          <div className="mt-2 md:mt-4 font-bold text-3xl text-center">
            Sketchrank
          </div>
          <div className="flex flex-col items-center mt-4 gap-4">
            {allSketchRankYears.map((year) => (
              <Card
                title={"Sketchrank " + year}
                description={""}
                link={`/sketch-rank/${year}`}
                date={""}
                key={year}
                image={`/images/preview_images/sketch_rank_${year}.png`}
              ></Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
