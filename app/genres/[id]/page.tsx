import SongCard from "@/components/SongCard";
import Title from "@/components/Title";
import { DeezerGenre, DeezerGenreResponse } from "@/types/deezer";

type Params = {
  params: { id: string };
};

export default async function GenrePage({ params }: Params) {
  const { id } = params;

  const res = await fetch(`https://api.deezer.com/chart/${id}/tracks?limit=50`);
  const data = await res.json();

  return (
    <div className="p-3 md:p-6 w-full">
      <Title
        title="Top Gatunki"
        styles=" text-4xl font-bold mt-[10vh] md:mt-[0] mb-[10vh] text-[var(--secondColor)] mx-auto text-center"
      />
      <div className="w-full  grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-20 mb-[5vh]">
        {data?.data?.map((track: any) => (
          <SongCard key={track.id} song={track} />
        ))}
      </div>
    </div>
  );
}
