"use client";

import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col md:flex-row items-center gap-5 md:gap-2 mt-15 md:mt-0"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Wpisz nazwę utworu lub artystę..."
        className="flex-1 w-full text-lg md:text-xl text-center md:text-left  p-2 px-5 uppercase rounded-lg border border-gray-600 bg-gray-800 text-white"
      />
      <button
        type="submit"
        className="px-10 py-2 text-xl uppercase font-bold bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Szukaj
      </button>
    </form>
  );
}
