"use client";

import { useDispatch } from "react-redux";
import { setActiveSong } from "../store/playerSlice";
import { Track } from "../store/playerSlice";

export default function SongCard({ song }: { song: Track }) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(setActiveSong(song))}
      className="cursor-pointer border rounded-lg p-3 hover:bg-gray-100"
    >
      <img
        src={song.album.cover_medium}
        alt={song.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{song.title}</h3>
      <p className="text-sm text-gray-500">{song.artist.name}</p>
    </div>
  );
}
