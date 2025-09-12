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
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Szukaj utworu lub artysty..."
        className="flex-1 p-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Szukaj
      </button>
    </form>
  );
}
