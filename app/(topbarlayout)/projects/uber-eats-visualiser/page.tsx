import type { Metadata } from "next";
import UberEatsAnalysisPage from "./visualiser";

export const metadata: Metadata = {
  title: "Uber Eats Data Visualiser",
  description: "Explore your eating habits, spending trends, and more.",
  openGraph: {
    title: "Uber Eats Data Visualiser",
    description: "Explore your eating habits, spending trends, and more.",
    url: "https://johnscolaro.xyz/projects/brisbanes-best-restaurants/2025",
    images: [
      {
        url: "https://johnscolaro.xyz/images/preview_images/uber-eats-visualiser.png",
        width: 1200,
        height: 624,
        alt: "An image of text saying: 'Uber Eats Data Visualiser'",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <article>
        <UberEatsAnalysisPage />
      </article>
    </>
  );
}
