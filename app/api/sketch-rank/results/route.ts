import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
    try {
        const result =
          await sql`SELECT playerId AS Id,
          SUM(winnerCount) AS TotalWins,
          SUM(loserCount) AS TotalLosses,
          SUM(winnerCount) - SUM(loserCount) AS WinsMinusLosses
     FROM (
             SELECT winnerId AS playerId, 1 AS winnerCount, 0 AS loserCount
               FROM SketchRankResults
             UNION ALL
             SELECT loserId AS playerId, 0 AS winnerCount, 1 AS loserCount
               FROM SketchRankResults
          ) AS SubQuery
   GROUP BY playerId
   ORDER BY WinsMinusLosses DESC;`;
        return NextResponse.json({ result }, { status: 200, headers: {'Cache-Control': 'no-store, max-age=0'} });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
}


