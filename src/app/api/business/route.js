import { NextResponse } from "next/server";
import { getAllBusinesses, saveBusiness } from "@/data/businessStore";

export async function GET() {
  try {
    const businesses = getAllBusinesses();
    return NextResponse.json({ success: true, businesses });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: "Business name is required" }, { status: 400 });
    }

    const created = saveBusiness(body);
    return NextResponse.json({ success: true, business: created });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

