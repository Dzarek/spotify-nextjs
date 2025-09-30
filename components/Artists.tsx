"use client";
import { DeezerGenre } from "@/types/deezer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useGetArtistsQuery } from "@/services/deezerApi";
import Loading from "@/app/loading";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Artists = ({ initialArtists }: { initialArtists: DeezerGenre[] }) => {
  const [artists, setArtists] = useState(initialArtists);
  const [letter, setLetter] = useState("");
  const [index, setIndex] = useState(0);
  const limit = 50;

  const { data, error, isLoading } = useGetArtistsQuery(
    { letter, limit, index },
    { skip: letter === "" && index > 0 }
  );

  useEffect(() => {
    setArtists([]);
    setIndex(0);
  }, [letter]);

  useEffect(() => {
    if (data?.data) {
      const filtered = data.data.filter((artist: DeezerGenre) =>
        artist.name.toLowerCase().startsWith(letter.toLowerCase())
      );
      setArtists((prev) => {
        const merged = [...prev, ...filtered];
        const unique = merged.filter(
          (artist, index, self) =>
            index === self.findIndex((a) => a.id === artist.id)
        );

        return unique;
      });
    }
  }, [data, letter]);

  const loadMore = () => setIndex((prev) => prev + limit);

  return (
    <>
      {/* Pasek A-Z */}
      <div className="flex mx-auto justify-center flex-wrap gap-4 mb-[7vh]">
        {alphabet.map((l) => (
          <button
            key={l}
            onClick={() => setLetter(l)}
            className={`px-3 py-1 rounded cursor-pointer text-xl ${
              letter === l ? "bg-purple-600 text-white" : "bg-zinc-900"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="w-full  grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-5 md:gap-10 mb-[5vh]">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            href={`/artists/${artist.id}`}
            className="p-4 bg-zinc-900 relative rounded-lg hover:bg-purple-900 duration-300 transition text-center"
          >
            {artist.picture_medium && (
              <Image
                src={artist.picture_medium}
                alt={artist.name}
                width={200}
                height={200}
                className="w-full h-full mx-auto rounded-lg mb-2 object-cover opacity-60"
              />
            )}
            <h3 className="text-2xl text-white bg-zinc-900 p-2 rounded-lg font-semibold absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
              {artist.name}
            </h3>
          </Link>
        ))}
      </div>
      {isLoading ? (
        <Loading title="Ładowanie artystów..." />
      ) : (
        <>
          {data?.data.length > 0 ? (
            <button
              className="Btn mx-auto mb-[5vh]"
              onClick={loadMore}
              disabled={data?.data.length === 0}
            >
              {error ? "Nie da się załadować więcej" : "Załaduj więcej"}
            </button>
          ) : (
            <p className="text-2xl font-bold text-center mx-auto mb-[5vh] cursor-auto">
              to już wszyscy artyści 😎
            </p>
          )}
        </>
      )}
    </>
  );
};

export default Artists;
