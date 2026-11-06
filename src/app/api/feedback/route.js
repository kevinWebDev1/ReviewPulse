import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FEEDBACK_FILE = path.join(process.cwd(), "src", "data", "feedback.json");

function ensureFile() {
  if (!fs.existsSync(FEEDBACK_FILE)) {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { slug, businessName, rating, message, customerPhone } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ success: false, error: "Message required" }, { status: 400 });
    }

    ensureFile();
    const existing = JSON.parse(fs.readFileSync(FEEDBACK_FILE, "utf8"));
    const entry = {
      id: `fb_${Date.now()}`,
      slug: slug || "general",
      businessName: businessName || "Unknown",
      rating: rating || 2,
      message: message.trim(),
      customerPhone: customerPhone?.trim() || null,
      createdAt: new Date().toISOString(),
      status: "unread"
    };

    existing.unshift(entry);
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(existing, null, 2), "utf8");

    return NextResponse.json({ success: true, feedbackId: entry.id });
  } catch (error) {
    console.error("Failed to save private feedback:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    ensureFile();
    const existing = JSON.parse(fs.readFileSync(FEEDBACK_FILE, "utf8"));
    return NextResponse.json({ success: true, feedback: existing });
  } catch (error) {
    return NextResponse.json({ success: false, feedback: [] });
  }
}

