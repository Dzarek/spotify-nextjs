import SongCard from "../components/SongCard";
import Player from "../components/Player";
import { DeezerChartResponse } from "../types/deezer";

export default async function Home() {
  const res = await fetch("https://api.deezer.com/chart?limit=50", {
    cache: "no-store", // zawsze świeże dane (SSR)
  });

  if (!res.ok) {
    throw new Error("Nie udało się pobrać danych z Deezer API."); // przechwyci error.tsx
  }
  const data: DeezerChartResponse = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6 text-[var(--secondColor)]">
        Top Charts
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
        {data.tracks.data.map((track) => (
          <SongCard key={track.id} song={track} />
        ))}
      </div>
      <Player />
    </div>
  );
}
