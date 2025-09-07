"use client";
import { TbMoodSadDizzy } from "react-icons/tb";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TbMoodSadDizzy className="text-7xl text-white mb-10 mx-auto" />
      <h2 className="text-xl font-bold text-white">
        Ups, coś poszło nie tak...
      </h2>
      {/* <p className="text-gray-500 mt-2">{error.message}</p> */}
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
      >
        Spróbuj ponownie
      </button>
    </div>
  );
}
