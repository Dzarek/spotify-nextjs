import { DeezerGenreResponse } from "@/types/deezer";
import Title from "@/components/Title";
import Artists from "@/components/Artists";

export default async function ArtistsPage() {
  const res = await fetch("https://api.deezer.com/chart/0/artists?limit=50");
  if (!res.ok) {
    throw new Error("Nie udało się pobrać artystów");
  }
  const data: DeezerGenreResponse = await res.json();

  return (
    <div className="p-3 md:p-6 w-full min-h-screen">
      <Title
        title="Top Artyści"
        styles=" text-4xl font-bold mt-[10vh] md:mt-[0] mb-[10vh] text-[var(--secondColor)] mx-auto text-center"
      />
      {data?.data && <Artists initialArtists={data.data} />}
    </div>
  );
}
