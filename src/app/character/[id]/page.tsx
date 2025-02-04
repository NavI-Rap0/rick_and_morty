// app/character/[id]/page.tsx

import { fetchCharacterById } from '../../../utils/fetchData';
import Image from 'next/image';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  episode: string[];
};

export default async function CharacterPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Отримуємо дані персонажа на сервері
  const character: Character | null = await fetchCharacterById(id);

  if (!character) {
    return <p className="text-center">Персонажа не знайдено.</p>;
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
          <p>
            <strong>Статус:</strong> {character.status}
          </p>
          <p>
            <strong>Вид:</strong>{" "}
            <span
              className={`inline-block px-3 py-1 rounded-full text-white ${
                character.species === "Alien"
                  ? "bg-green-500"
                  : character.species === "Human"
                  ? "bg-blue-500"
                  : "bg-red-500"
              }`}
            >
              {character.species}
            </span>
          </p>
          <p>
            <strong>Стать:</strong>{" "}
            <span
              className={`inline-block px-3 py-1 rounded-full text-white ${
                character.gender === "Female"
                  ? "bg-pink-500"
                  : character.gender === "Male"
                  ? "bg-blue-500"
                  : "bg-purple-500"
              }`}
            >
              {character.gender}
            </span>
          </p>
          <p>
            <strong>Місце народження:</strong> {character.origin.name}
          </p>
          <p>
            <strong>Останнє відоме місцезнаходження:</strong>{" "}
            {character.location.name}
          </p>
        </div>
      </div>
    </main>
  );
}
