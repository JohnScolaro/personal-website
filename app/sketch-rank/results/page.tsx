import ResultsTable from "./resultsTable";

export default function Page() {
  return (
    <div className="max-w-6xl p-4 m-auto">
      <div className="mt-2 md:mt-4 font-bold text-3xl text-center">Results</div>
      <p className="text-center mt-4">
        Here is a giant table of all the results thus far
      </p>
      <div className="flex justify-center">
        <ResultsTable></ResultsTable>
      </div>
    </div>
  );
}
