import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const letter = searchParams.get("letter") || "";
  const limit = searchParams.get("limit") || "50";
  const index = searchParams.get("index") || "0";

  try {
    const query = letter ? `${letter}` : "";
    const url = letter
      ? `https://api.deezer.com/search/artist?q=${encodeURIComponent(
          query
        )}&limit=${limit}&index=${index}`
      : `https://api.deezer.com/chart/0/artists?limit=${limit}&index=${index}`;

    const res = await fetch(url);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Nie udało się pobrać artystów" },
      { status: 500 }
    );
  }
}
