import Card from "../../../../components/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SketchRank",
  description: "A list of all blog posts I've made",
};

export default function Page() {
  const allYears = [2025, 2026].sort((a, b) => b - a);

  return (
    <section>
      <div className="max-w-6xl p-4 m-auto">
        <div className="mt-2 md:mt-4 font-bold text-3xl text-center">
          Brisbane's Best Restaurants
        </div>
        <div className="flex flex-col items-center mt-4 gap-4">
          {allYears.map((year) => (
            <Card
              key={year}
              title={`Brisbane's Best Restaurants ${year}`}
              description=""
              link={`/projects/brisbanes-best-restaurants/${year}`}
              date=""
              image={`/images/preview_images/brisbanes-best-restaurants-${year}.png`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
