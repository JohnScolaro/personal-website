import ResultsTable from "./resultsTable";
import StatsParagraph from "./statsParagraph";
import { getAllSketchRankYears } from "../../utils";
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return {
    title: `SketchRank ${resolvedParams.year} Results`,
    description: "The results of SketchRank voting.",
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const year = resolvedParams?.year;

  return (
    <div className="max-w-6xl p-4 m-auto">
      <div className="mt-2 md:mt-4 font-bold text-3xl text-center">Results</div>
      <div className="flex flex-col gap-4 items-center mt-4">
        <StatsParagraph year={year} />
        <ResultsTable year={year} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const allSketchRankYears = getAllSketchRankYears();

  return allSketchRankYears.map((year) => ({
    year: year.toString(),
  }));
}
