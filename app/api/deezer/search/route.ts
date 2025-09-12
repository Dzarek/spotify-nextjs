import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=20`
  );
  const data = await res.json();

  return NextResponse.json(data);
}
