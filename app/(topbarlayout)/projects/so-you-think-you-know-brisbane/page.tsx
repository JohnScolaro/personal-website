import type { Metadata } from "next";
import Link from "next/link";
import SuburbGuesser from "./suburbGuesser";

export const metadata: Metadata = {
  title: "So you think you know Brisbane",
  description:
    "A game where you attempt to guess Brisbane's suburbs using a map of adjacent suburbs.",
  openGraph: {
    title: "So you think you know Brisbane?",
    description:
      "A game where you attempt to guess Brisbane's suburbs using a map of adjacent suburbs.",
    url: "https://johnscolaro.xyz/projects/so-you-think-you-know-brisbane",
    images: [
      {
        url: "https://johnscolaro.xyz/images/preview_images/so_you_think_you_know_brisbane.png",
        width: 1200,
        height: 630,
        alt: 'Text reading: "So you think you know Brisbane" written in Brisbane City Council colours.',
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <div className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto prose-img:max-w-xl prose-img:w-full prose-code:leading-5 prose-pre:p-0 prose-code:before:content-none prose-code:after:content-none">
        <h1>So you think you know Brisbane?</h1>
        <p>Guess the suburb from the map.</p>
        <SuburbGuesser></SuburbGuesser>
        <p>
          Brisbane has{" "}
          <Link
            href={"https://johnscolaro.xyz/blog/brisbane-has-too-many-suburbs"}
          >
            {" "}
            a lot of suburbs
          </Link>{" "}
          - 190 to be exact and that doesn’t include islands and a few other
          localities.
        </p>
        <p>
          Turns out trying to guess them is pretty fun. Reckon you can name them
          all?
        </p>
      </div>
    </>
  );
}
