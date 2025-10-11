import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: {
    genreId: string;
  };
}

export async function GET(req: NextRequest, context: RouteContext) {
  const { genreId } = context.params;

  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || "50";
  const index = searchParams.get("index") || "0";

  try {
    const res = await fetch(
      `https://api.deezer.com/chart/${genreId}/tracks?limit=${limit}&index=${index}`
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Nie udało się pobrać utworów dla garunku" },
      { status: 500 }
    );
  }
}
