"use client";

import { useDispatch } from "react-redux";
import { setActiveSong } from "../store/playerSlice";
import { Track } from "../store/playerSlice";
import Image from "next/image";

export default function SongCard({ song }: { song: Track }) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(setActiveSong(song))}
      className="cursor-pointer border border-purple-600 rounded-lg p-3 bg-zinc-900 hover:bg-zinc-900 duration-500"
    >
      <Image
        src={song.album.cover_medium}
        alt={song.title}
        width={600}
        height={600}
        className="w-[200px] mx-auto h-[200px] mb-3 object-cover rounded-full border-2 border-purple-200"
      />
      <h3 className="mt-2 text-xl tracking-wider font-semibold">
        {song.title}
      </h3>
      <p className="text-lg text-gray-500">{song.artist.name}</p>
    </div>
  );
}
