"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { nextSong, playPause, prevSong } from "../store/playerSlice";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import YouTubeLink from "./YouTubeLink";

export default function MiniPlayer() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(
    (state: RootState) => state.player
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);

    const setMeta = () => setDuration(audio.duration || 0);
    const handleEnded = () => dispatch(playPause(false));
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setMeta);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setMeta);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [activeSong, dispatch]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      void audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, activeSong]);

  // Aktualizacja głośności
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    dispatch(playPause(!isPlaying));
  };

  if (!activeSong) return null; // nic nie pokazuj, dopóki nie kliknięto
  // console.log(activeSong);

  return (
    <div className="fixed z-50 bottom-0 left-0 w-4/5 bg-[rgba(0,0,0,0.9)] text-white p-5 px-10 flex items-center justify-between shadow-lg">
      <div className="flex flex-row w-[30%]">
        {/* Okładka */}
        <Image
          src={
            activeSong.album.cover_medium
              ? activeSong.album.cover_medium
              : "/logo.png"
          }
          alt={activeSong.title}
          width={48}
          height={48}
          className="w-12 h-12 rounded-md object-cover mr-5"
        />

        {/* Info */}
        <div className="flex flex-col w-[70%]">
          <span className="text-lg font-semibold text-purple-400 truncate">
            {activeSong.title}
          </span>
          <span className="text-base text-gray-400 truncate">
            {activeSong.artist.name}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-[40%]">
        {/* Kontrolki */}
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => dispatch(prevSong())}
            className="p-2 rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <FaStepBackward size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="p-2 bg-purple-600 rounded-full hover:bg-purple-500 cursor-pointer"
          >
            {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
          </button>

          <button
            onClick={() => dispatch(nextSong())}
            className="p-2 rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <FaStepForward size={20} />
          </button>
        </div>
        {/* Suwak postępu */}
        <ProgressBar
          progress={progress}
          duration={duration}
          onSeek={(value: number) => {
            if (audioRef.current) {
              audioRef.current.currentTime = value;
            }
            setProgress(value);
          }}
        />
      </div>
      {/* Głośność */}
      <div className="w-[15%] flex justify-end items-center">
        <VolumeControl volume={volume} onChange={setVolume} />
      </div>
      <div className="w-[15%] flex justify-end items-center">
        <YouTubeLink song={activeSong} player={true} />
      </div>

      <audio ref={audioRef} src={activeSong.preview} />
    </div>
  );
}
