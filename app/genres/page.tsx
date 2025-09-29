import { DeezerGenre, DeezerGenreResponse } from "@/types/deezer";
import Link from "next/link";
import Image from "next/image";
import Title from "@/components/Title";

export default async function GenresPage() {
  const res = await fetch("https://api.deezer.com/genre");
  if (!res.ok) {
    throw new Error("Nie udało się pobrać gatunków");
  }
  const data: DeezerGenreResponse = await res.json();
  const filteredData: DeezerGenre[] = data?.data?.filter(
    (item) => item.id !== 0
  );

  return (
    <div className="p-3 md:p-6 w-full">
      <Title
        title="Gatunki Muzyczne"
        styles=" text-4xl font-bold mt-[10vh] md:mt-[0] mb-[10vh] text-[var(--secondColor)] mx-auto text-center"
      />
      <div className="w-full  grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-5 md:gap-10 mb-[5vh]">
        {filteredData.map((genre) => (
          <Link
            key={genre.id}
            href={`/genres/${genre.id}`}
            className="p-4 bg-zinc-900 relative rounded-lg hover:bg-purple-900 duration-300 transition text-center"
          >
            {genre.picture_medium && (
              <Image
                src={genre.picture_medium}
                alt={genre.name}
                width={200}
                height={200}
                className="w-full h-full mx-auto rounded-lg mb-2 object-cover opacity-60"
              />
            )}
            <h3 className="text-2xl text-white bg-zinc-900 p-2 rounded-lg font-semibold absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
              {genre.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
