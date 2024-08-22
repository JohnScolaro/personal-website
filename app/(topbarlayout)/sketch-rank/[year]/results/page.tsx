import ResultsTable from "./resultsTable";
import StatsParagraph from "./statsParagraph";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SketchRank Results",
  description: "The results of SketchRank voting.",
};

export default function Page({ params }) {
  const year = params.year;

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
