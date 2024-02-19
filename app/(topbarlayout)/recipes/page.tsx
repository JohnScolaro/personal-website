import type { Metadata } from "next";
import { getSortedRecipeData } from "../../../lib/recipes";
import Card from "../../../components/card";

export const metadata: Metadata = {
  description: "Recipes by John",
};

export default function Page() {
  const allRecipeData = getSortedRecipeData();

  return (
    <>
      <section>
        <div className="max-w-6xl p-4 m-auto">
          <div className="mt-2 md:mt-4 font-bold text-3xl text-center">
            Recipes
          </div>
          <div className="flex flex-col items-center mt-4 gap-4">
            {allRecipeData.map(({ id, title }) => (
              <Card
                title={title}
                description={null}
                link={`/recipes/${id}`}
                date={null}
                key={id}
              ></Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
