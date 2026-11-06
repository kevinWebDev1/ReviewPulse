import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    // In production, this increments Redis/Postgres analytics counters
    // Log for development and staging visibility
    console.log("[Analytics Event Received]:", {
      ...body,
      receivedAt: new Date().toISOString()
    });

    return NextResponse.json({ acknowledged: true });
  } catch (err) {
    return NextResponse.json({ acknowledged: false, error: err.message }, { status: 500 });
  }
}

