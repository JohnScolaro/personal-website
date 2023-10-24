import ImageCompetition from "./imageCompetition";

export default function Page() {
  return (
    <>
      <h1>What is this</h1>
      <p>
        Every night before bed, instead of scrolling endlessly on our devices,
        my partner and I draw a small doodle using Procreate on her iPad. There
        is a time limit of 5 minutes (limit might be a little strong. It's more
        like... a guideline...) so the quality isn't high. I thought, let's put
        them all online and let the public rank them against each other. It'll
        be interesting to see which drawings come out on top.
      </p>
      <ImageCompetition></ImageCompetition>
    </>
  );
}
