import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const year = url.searchParams.get("year");

  if (!year) {
    return NextResponse.json(
      { error: "Year parameter is required" },
      { status: 400 }
    );
  }

  try {
    const result = await sql`
        SELECT
            COUNT(*) AS total_votes,
            COUNT(CASE WHEN timestamp >= NOW() - INTERVAL '7 DAY' THEN 1 ELSE NULL END) AS votes_last_7_days,
            COUNT(CASE WHEN timestamp >= NOW() - INTERVAL '1 DAY' THEN 1 ELSE NULL END) AS votes_last_1_day
        FROM SketchRankResults
        WHERE year = ${year};
    `;

    return NextResponse.json(
      { result },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
