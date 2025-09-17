"use client";

import { useState, useEffect } from "react";
import { useSearchTracksQuery } from "../../services/deezerApi";
import SearchBar from "@/components/SearchBar";
import SongCard from "@/components/SongCard";
import Loading from "../loading";
import GlobalError from "../error";
import { setActiveSong, setQueue, Track } from "@/store/playerSlice";
import { useDispatch } from "react-redux";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchTracksQuery(query, {
    skip: !query, // nie odpala zapytania gdy query puste
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.data?.length) {
      dispatch(setQueue(data.data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setActiveSong(null));
  }, [dispatch]);

  return (
    <div className="p-6 min-h-screen">
      <SearchBar onSearch={setQuery} />

      {isLoading && <Loading title="Szukam utworów..." />}
      {error && <GlobalError error={error} />}

      {data && (
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-20 mb-[5vh]">
          {data.data.map((track: Track) => (
            <SongCard key={track.id} song={track} />
          ))}
        </div>
      )}
    </div>
  );
}
