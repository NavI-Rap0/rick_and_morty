import SomeError from "@/components/SomeError";
import Button from "@/components/Button";
import { fetchCharacterById, fetchEpisodesByIds } from "@/utils/fetchData";
import Image from "next/image";


interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: string[];
}

interface Episode {
  id: number;
  name: string;
  episode: string;
}
export default async function CharacterPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ showEpisodes?: string }> }) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const { id } = awaitedParams;
  const showEpisodes = awaitedSearchParams?.showEpisodes === "true";

  const character: Character | null = await fetchCharacterById(id);
  if (!character) return <SomeError />;

  const episodes: Episode[] = showEpisodes ? await fetchEpisodesByIds(character.episode) : [];

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[70vw] max-w-2xl flex flex-col items-center gap-6 shadow-lg rounded-lg p-8">
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: "linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%)",
            filter: "blur(2rem)",
            opacity: 0.4,
            zIndex: -1,
          }}
        ></div>

        <div className="relative w-48 h-48">
          <Image src={character.image} alt={character.name} fill className="rounded-full object-cover" priority />
        </div>
        <h1 className="text-2xl font-bold text-center">{character.name}</h1>
        <div className="flex flex-col gap-2 text-center">
          <p><strong>Статус:</strong> {character.status}</p>
          <p><strong>Вид:</strong> {character.species}</p>
          <p><strong>Стать:</strong> {character.gender}</p>
          <p><strong>Місце народження:</strong> {character.origin.name}</p>
          <p><strong>Останнє відоме місцезнаходження:</strong> {character.location.name}</p>
        </div>

        <Button href={`?showEpisodes=${showEpisodes ? "false" : "true"}`} className="mt-4">
          {showEpisodes ? "Приховати епізоди" : "Показати епізоди"}
        </Button>

        {showEpisodes && episodes.length > 0 && (
          <div className="mt-4 w-full grid grid-cols-2 gap-4 rounded-lg p-4">
            {episodes.map((ep) => (
              <div key={ep.id} className="text-center p-2 shadow rounded">
                <strong>{ep.episode}</strong>, {ep.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
