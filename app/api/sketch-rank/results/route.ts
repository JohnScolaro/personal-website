import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const result =
          await sql`SELECT
          playerId AS Id,
          SUM(winnerCount) AS TotalWins,
          SUM(loserCount) AS TotalLosses,
          CASE
              WHEN SUM(winnerCount) + SUM(loserCount) = 0 THEN 0.00
              ELSE CAST(SUM(winnerCount) AS DECIMAL(10,2)) / (SUM(winnerCount) + SUM(loserCount))
          END AS WinPercent
      FROM (
          SELECT winnerId AS playerId, 1 AS winnerCount, 0 AS loserCount
          FROM SketchRankResults
          UNION ALL
          SELECT loserId AS playerId, 0 AS winnerCount, 1 AS loserCount
          FROM SketchRankResults
      ) AS SubQuery
      GROUP BY playerId
      ORDER BY WinPercent DESC;`;
        return NextResponse.json({ result }, { status: 200, headers: {'Cache-Control': 'no-store', 'CDN-Cache-Control': 'no-store', 'Vercel-CDN-Cache-Control': 'no-store'} });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
}


