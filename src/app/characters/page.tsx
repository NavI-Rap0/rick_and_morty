import { fetchCharacters } from "@/utils/fetchData";
import { buildFilters, buildPageUrl } from "@/utils/helpers";
import CharacterCardsList from "@/components/CharacterCardsList";
import Pagination from "@/components/Pagination";
import Filter from "@/components/Filter";
import SomeError from "@/components/SomeError";

interface SearchParams {
  page?: string;
  status?: string;
  species?: string;
  gender?: string;
  name?: string;
}

export default async function CharactersPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const awaitedSearchParams = await searchParams;
  const currentPage = parseInt(awaitedSearchParams?.page ?? "1", 10);
  const filters = buildFilters(awaitedSearchParams);
  const data = await fetchCharacters(currentPage, filters);
  const { results: characters, info } = data;

  if (!data || !data.results || data.results.length === 0) {
    return <SomeError />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <Filter currentFilters={filters} />
      <CharacterCardsList characters={characters} />
      <Pagination
        currentPage={currentPage}
        totalPages={info.pages}
        onPageChange={(page) => buildPageUrl(filters, page)}
      />
    </div>
  );
}
