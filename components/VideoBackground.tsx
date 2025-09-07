"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function VideoBackground() {
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);

  return (
    <video
      className="fixed top-0 left-0 w-4/5 h-full object-cover z-0"
      src="/videoBg.mp4" // w public folder
      autoPlay
      muted
      loop
      playsInline
      //   ref={(video) => {
      //     if (!video) return;
      //     if (isPlaying) video.play().catch(() => {});
      //     else video.pause();
      //   }}
    />
  );
}
