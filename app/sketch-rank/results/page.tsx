import ResultsTable from "./resultsTable";
import StatsParagraph from "./statsParagraph";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-6xl p-4 m-auto">
      <div className="mt-2 md:mt-4 font-bold text-3xl text-center">Results</div>
      <div className="flex flex-col gap-4 items-center mt-4">
        <Link href={"/sketch-rank"} className="hyperlink">
          Take me back to the fun!
        </Link>
        <StatsParagraph />
        <ResultsTable />
      </div>
    </div>
  );
}
