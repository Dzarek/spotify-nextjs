"use client";

import { useState } from "react";
import { useGetTopChartsQuery } from "../redux/services/deezerApi";

export default function Home() {
  const [limit, setLimit] = useState(20);
  const { data, error, isLoading } = useGetTopChartsQuery(limit);

  if (isLoading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd pobierania danych</p>;
  if (!data) return <p>Brak danych</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Deezer Top Charts</h1>

      <div className="mb-4">
        <label htmlFor="limit" className="mr-2">
          Ile utworów pobrać:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border px-2 py-1"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <ul className="space-y-4">
        {data.tracks.data.map((track) => (
          <li key={track.id} className="border-b pb-2">
            <p className="font-semibold">{track.title}</p>
            <p className="text-sm text-gray-500">{track.artist.name}</p>
            {track.preview && (
              <audio controls className="mt-2 w-full">
                <source src={track.preview} type="audio/mpeg" />
                Twoja przeglądarka nie obsługuje audio.
              </audio>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
