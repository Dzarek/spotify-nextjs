"use client";

import { useGetGenreTracksQuery } from "@/services/deezerApi";
import SongCard from "./SongCard";
import { useEffect, useState } from "react";
import { DeezerTrack } from "@/types/deezer";
import Loading from "@/app/loading";
import { useDispatch } from "react-redux";
import { setQueue } from "@/store/playerSlice";

const GenreTracks = ({
  genreId,
  initialTracks,
}: {
  genreId: string;
  initialTracks: DeezerTrack[];
}) => {
  const [tracks, setTracks] = useState<DeezerTrack[]>(initialTracks);
  const [index, setIndex] = useState(0);
  const limit = 50;
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetGenreTracksQuery(
    { genreId, limit, index },
    { skip: index === 0 }
  );

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      setTracks((prev) => [...prev, ...data.data]);
    }
  }, [data]);

  useEffect(() => {
    dispatch(setQueue(tracks));
  }, [tracks, dispatch]);

  const loadMore = () => setIndex((prev) => prev + limit);

  return (
    <>
      <div className="w-full  grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-20 mb-[5vh]">
        {tracks.map((track: DeezerTrack) => (
          <SongCard key={track.id} song={track} />
        ))}
      </div>
      {isLoading ? (
        <Loading title="Ładowanie muzyki..." />
      ) : (
        <button
          className="Btn mx-auto mb-[5vh]"
          onClick={loadMore}
          disabled={isLoading}
        >
          {error ? "Nie da się załadować więcej" : "Załaduj więcej"}
        </button>
      )}
    </>
  );
};

export default GenreTracks;
