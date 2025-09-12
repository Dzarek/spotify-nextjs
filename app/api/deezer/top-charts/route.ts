import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || "50"; // domyślnie 50

  try {
    const response = await fetch(`https://api.deezer.com/chart?limit=${limit}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Nie udało się pobrać danych z Deezer" },
      { status: 500 }
    );
  }
}
