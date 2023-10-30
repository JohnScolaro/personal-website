import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "John Scolaro's Blog",
};

export default function Page() {
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex flex-row justify-center text-2xl">
        🚧 Work in Progress 🚧
      </div>
    </div>
  );
}
