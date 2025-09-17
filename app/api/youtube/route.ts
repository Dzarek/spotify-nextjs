import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const apiKey = process.env.YOUTUBE_API_KEY; // ustaw w .env.local
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
    q
  )}&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  const videoId = data.items?.[0]?.id?.videoId;

  return NextResponse.json({
    videoUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : null,
  });
}
