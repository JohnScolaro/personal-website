import { NextResponse } from "next/server";
import sketchRankSecurity from "../../../../lib/encryption";
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    const body = await request.json();

    const winnerId = body.winner;
    const loserId = body.loser;
    const sessionId = body.sessionId;
    const secret = body.secret;

    const computedSecret = sketchRankSecurity(winnerId, loserId, sessionId);

    if (secret != computedSecret) {
        return NextResponse.json({}, {status: 401});
    }

    try {
        await sql`INSERT INTO SketchRankResults (winnerId, loserId, sessionId, timestamp) VALUES (${winnerId}, ${loserId}, ${sessionId}, NOW());`;
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }

    return NextResponse.json({message: "Success"});
}
