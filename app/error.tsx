"use client";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TbMoodSadDizzy } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
}: {
  error: FetchBaseQueryError | SerializedError;
}) {
  console.log(error);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TbMoodSadDizzy className="text-7xl text-white mb-10 mx-auto" />
      <h2 className="text-xl font-bold text-white">
        Ups, coś poszło nie tak...
      </h2>
      <button
        onClick={() => router.refresh()}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
      >
        Odśwież stronę
      </button>
    </div>
  );
}
