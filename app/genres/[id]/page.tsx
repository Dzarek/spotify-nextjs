import GenreTracks from "@/components/GenreTracks";
import Title from "@/components/Title";
import { DeezerGenre } from "@/types/deezer";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";

type Params = {
  params: { id: string };
};

export default async function GenrePage({ params }: Params) {
  const { id } = await params;

  const genresRes = await fetch("https://api.deezer.com/genre");
  if (!genresRes.ok) throw new Error("Nie udało się pobrać gatunków");
  const genresData: { data: DeezerGenre[] } = await genresRes.json();

  // 2️⃣ Znalezienie aktualnego gatunku
  const currentGenre = genresData.data.find((g) => g.id.toString() === id);

  const res = await fetch(`https://api.deezer.com/chart/${id}/tracks?limit=50`);
  const data = await res.json();

  return (
    <div className="p-3 md:p-6 w-full">
      <Link
        href="/genres"
        className="text-3xl flex items-center font-bold mt-[1vh] md:mt-0 text-gray-400 hover:text-white duration-300 mx-auto text-center md:text-left"
      >
        <RiArrowGoBackFill className="mr-2" />
        Gatunki Muzyczne
      </Link>
      <Title
        title={currentGenre ? currentGenre.name : "Top Utwory Muzyczne"}
        styles=" text-4xl font-bold mt-[5vh] md:mt-[0] mb-[10vh] text-[var(--secondColor)] mx-auto text-center"
      />
      <GenreTracks genreId={id} initialTracks={data.data} />
    </div>
  );
}
