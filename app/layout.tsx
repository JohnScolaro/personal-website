import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata = {
  title: "John's Website",
  description: "A personal website for John Scolaro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
