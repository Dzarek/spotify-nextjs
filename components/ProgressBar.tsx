"use client";

import { memo } from "react";

type ProgressBarProps = {
  progress: number;
  duration: number;
  onSeek: (value: number) => void;
};

const ProgressBar = ({ progress, duration, onSeek }: ProgressBarProps) => {
  const getTime = (time: number) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className="flex w-full items-center justify-between">
      <span className="w-[15%] text-center">{getTime(progress)}</span>
      <input
        type="range"
        min={0}
        max={duration}
        value={progress}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="w-[70%] mx-auto accent-purple-500"
      />
      <span className="w-[15%] text-center">{getTime(duration)}</span>
    </div>
  );
};

export default memo(ProgressBar);
