import { fetchCharacters } from "../../utils/fetchData";
import CharacterCard from "../../components/CharacterCard";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";

type Character = {
  id: number;
  name: string;
  gender: string;
  species: string;
  image: string;
  status: string;
};

export default async function CharactersPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const currentPage = parseInt(searchParams.page ?? "1", 10);
   
  // Фільтри
  const filters: Record<string, string> = {};
  if (searchParams.status) filters.status = searchParams.status.toLowerCase();
  if (searchParams.species) filters.species = searchParams.species;
  if (searchParams.gender) filters.gender = searchParams.gender;
  if (searchParams.name) filters.name = searchParams.name; // Додаємо пошук за ім'ям

  const data = await fetchCharacters(currentPage, filters);

  if (!data?.results?.length) {
    return (
      <main className="flex flex-col items-center justify-center py-8 px-4">
        <h1 className="text-2xl font-bold">Нічого не знайдено</h1>
        <p>Спробуйте змінити фільтри або перезавантажити сторінку.</p>
      </main>
    );
  }

  const { results: characters, info } = data;

  return (
    <main className="flex flex-col items-center justify-center py-8 px-4">
      <Filter currentFilters={filters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {characters.map((character: Character) => (
          <CharacterCard key={character.id} {...character} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={info.pages}
        onPageChange={(page) => {
          const validFilters = Object.fromEntries(
            Object.entries(filters).filter(([, v]) => v !== undefined)
          ) as Record<string, string>;

          return `/characters?page=${page}&${new URLSearchParams(validFilters).toString()}`;
        }}
      />
    </main>
  );
} 

