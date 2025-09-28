import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`https://api.deezer.com/genre`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Nie udało się pobrać gatunków z Deezer" },
      { status: 500 }
    );
  }
}
