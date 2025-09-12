"use client";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { memo } from "react";

type VolumeControlProps = {
  volume: number;
  onChange: (value: number) => void;
};

const VolumeControl = ({ volume, onChange }: VolumeControlProps) => (
  <div className="flex items-center justify-end gap-2 w-32">
    {volume > 0 ? <FaVolumeUp size={16} /> : <FaVolumeMute size={16} />}
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-blue-500"
    />
  </div>
);

export default memo(VolumeControl);
