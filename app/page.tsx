"use client";

import { useState, useEffect } from "react";
import SongCard from "../components/SongCard";
import Title from "@/components/Title";
import { useGetTopChartsQuery } from "../services/deezerApi";
import Loading from "./loading";
import GlobalError from "./error";
import { useDispatch } from "react-redux";
import { setActiveSong, setQueue } from "@/store/playerSlice";

export default function Home() {
  const [limit, setLimit] = useState(50);
  const { data, error, isLoading } = useGetTopChartsQuery(limit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveSong(null));
  }, [dispatch]);

  useEffect(() => {
    if (data && data.tracks?.data?.length) {
      dispatch(setQueue(data.tracks.data));
    }
  }, [data, dispatch]);

  if (isLoading) return <Loading title="Ładowanie muzyki..." />;
  if (error) return <GlobalError error={error} />;
  if (!data) return <p>Brak danych</p>;

  return (
    <div className="p-6">
      <Title
        title="Najlepsze Listy Przebojów"
        styles=" text-4xl font-bold mb-[10vh] text-[var(--secondColor)] mx-auto text-center"
      />
      <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-20 mb-[5vh]">
        {data.tracks.data.map((track) => (
          <SongCard key={track.id} song={track} />
        ))}
      </div>
      <button
        className="Btn mx-auto mb-[5vh]"
        onClick={() => setLimit(limit + 50)}
        disabled={isLoading}
      >
        {isLoading ? "Chwilka..." : "Załaduj więcej"}
      </button>
    </div>
  );
}
