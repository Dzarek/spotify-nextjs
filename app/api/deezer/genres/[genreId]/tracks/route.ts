import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    genreId: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || "50";
  const { genreId } = params;

  try {
    const res = await fetch(
      `https://api.deezer.com/editorial/${genreId}/charts?limit=${limit}`
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
