// app/character/[id]/page.tsx
import { fetchCharacterById } from "@/utils/fetchData";
import Image from "next/image";

interface PageProps {
  params: { id: string };
}

export default async function CharacterPage({ params }: PageProps) {
  const { id } = params;
  const character = await fetchCharacterById(id);

  if (!character) {
    return <p>Персонажа не знайдено.</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center py-8 px-4">
      <div className="flex flex-col items-center gap-6 bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <div className="relative w-48 h-48">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="rounded-full object-cover"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-center">{character.name}</h1>
        <div className="flex flex-col gap-2">
          <p><strong>Статус:</strong> {character.status}</p>
          <p><strong>Вид:</strong> {character.species}</p>
          <p><strong>Стать:</strong> {character.gender}</p>
          <p><strong>Місце народження:</strong> {character.origin.name}</p>
          <p><strong>Останнє відоме місцезнаходження:</strong> {character.location.name}</p>
        </div>
      </div>
    </main>
  );
}
