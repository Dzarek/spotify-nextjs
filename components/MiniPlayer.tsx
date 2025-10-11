"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { nextSong, playPause, prevSong } from "../store/playerSlice";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { GrExpand, GrContract } from "react-icons/gr";

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
  const [fullSize, setFullSize] = useState(false);

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

  useEffect(() => {
    if (window.innerWidth < 768) {
      setFullSize(true);
    } else {
      setFullSize(false);
    }
  }, []);

  if (!activeSong) return null; // nic nie pokazuj, dopóki nie kliknięto
  // console.log(activeSong);

  return (
    <div
      className={`${
        fullSize
          ? "h-screen py-[5vh] pt-[7vh]"
          : "h-auto flex flex-wrap items-center justify-between"
      }  fixed z-50 bottom-0 left-0 w-full md:w-4/5 bg-[rgba(0,0,0,0.9)] text-white p-5 px-10 flex flex-wrap items-center justify-between shadow-lg`}
    >
      {fullSize ? (
        <GrContract
          className="absolute top-7 left-5 cursor-pointer text-white text-2xl md:hidden"
          onClick={() => setFullSize(false)}
        />
      ) : (
        <GrExpand
          className="absolute top-7 left-5 cursor-pointer text-white text-2xl md:hidden"
          onClick={() => setFullSize(true)}
        />
      )}
      <div
        className={`flex w-full md:w-[30%] mb-5 md:ml-0 ${
          fullSize ? "flex-col mb-[-5vh]" : "flex-row ml-7"
        }`}
      >
        {/* Okładka */}
        <Image
          src={
            activeSong.album.cover_medium
              ? activeSong.album.cover_medium
              : "/logo.png"
          }
          alt={activeSong.title}
          width={fullSize ? 300 : 48}
          height={fullSize ? 300 : 48}
          className={`${
            fullSize ? "w-[80%] mx-auto mb-5" : "w-12 h-12 mr-5"
          } rounded-md object-cover `}
        />

        {/* Info */}
        <div
          className={`${
            fullSize ? "mx-auto text-center" : ""
          } flex flex-col w-[70%]`}
        >
          <span
            className={`${
              fullSize ? "text-3xl mb-3" : "text-lg"
            } font-semibold text-purple-400 truncate`}
          >
            {activeSong.title}
          </span>
          <span
            className={`${
              fullSize ? "text-xl" : "text-base"
            } text-gray-400 truncate`}
          >
            {activeSong.artist.name}
          </span>
        </div>
      </div>
      <div
        className={`${
          fullSize ? "order-0" : "order-1"
        } flex flex-col items-center justify-center w-full md:order-0 md:w-[40%] mt-5 md:mt-0`}
      >
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

      <div className="w-1/2 md:w-[15%] flex md:justify-end items-center">
        <VolumeControl volume={volume} onChange={setVolume} />
      </div>
      <div className="w-1/2 md:w-[15%] flex justify-end items-center">
        <YouTubeLink song={activeSong} player={true} />
      </div>

      <audio ref={audioRef} src={activeSong.preview} />
    </div>
  );
}
