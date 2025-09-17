"use client";

import { useSelector, useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../store/playerSlice";
import { Track } from "../store/playerSlice";
import Image from "next/image";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { RootState } from "@/store";

export default function SongCard({ song }: { song: Track }) {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  const togglePlay = () => {
    dispatch(playPause(!isPlaying));
  };

  return (
    <div className="relative border border-purple-600 rounded-lg p-3 bg-zinc-900 hover:bg-zinc-900 duration-500">
      {activeSong?.id === song.id ? (
        <div className="absolute top-0 left-0 w-full h-full  bg-[#cd42d1a1] duration-300 text-white  flex justify-center items-start">
          <button
            onClick={togglePlay}
            className="text-4xl mt-[95px] cursor-pointer hover:text-black duration-300"
          >
            {isPlaying ? <FaCirclePause /> : <FaCirclePlay />}
          </button>
        </div>
      ) : (
        <div
          onClick={() => dispatch(setActiveSong(song))}
          className="absolute top-0 left-0 w-full h-full opacity-0 bg-[rgba(0,0,0,0.5)] duration-300 text-white hover:opacity-100 flex justify-center items-start"
        >
          <FaCirclePlay className="text-4xl mt-[95px] cursor-pointer" />
        </div>
      )}
      <Image
        src={song.album.cover_medium ? song.album.cover_medium : "/logo.png"}
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
