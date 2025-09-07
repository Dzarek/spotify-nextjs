"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { playPause } from "../store/playerSlice";

export default function Player() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  if (!activeSong) return null; // nic nie pokazuj, dopóki nie kliknięto

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 flex items-center">
      <img
        src={activeSong.album.cover_medium}
        alt={activeSong.title}
        className="w-16 h-16 rounded mr-4"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{activeSong.title}</h3>
        <p className="text-sm text-gray-500">{activeSong.artist.name}</p>
      </div>
      <button
        onClick={() => dispatch(playPause(!isPlaying))}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <audio src={activeSong.preview} autoPlay controls className="ml-4" />
    </div>
  );
}
