import type { Metadata } from "next";
import LLMStylePost from "./post";

export const metadata: Metadata = {
  title: "Do LLMs Have Style?",
  description:
    "A quick experiment of the stylistic tastes of LLMs in frontend design.",
};

export default function Page() {
  return <LLMStylePost />;
}
