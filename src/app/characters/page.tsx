import { fetchCharacters } from "@/utils/fetchData";
import { buildFilters, buildPageUrl } from "@/helpers/pagesHelpers";
import CharacterCardsList from "@/components/CharacterCardsList/CharacterCardsList";
import Pagination from "@/components/Pagination/Pagination";
import Filter from "@/components/Filter/Filter";
import SomeError from "@/components/SomeError/SomeError";
import NoResults from "@/components/NoResults/NoResults";

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
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const filters = buildFilters(params);

  try {
    const { results, info } = await fetchCharacters(page, filters);
    return (
      <div className="container mx-auto p-4">
        <Filter currentFilters={filters} />
        {results.length > 0 ? (
          <CharacterCardsList characters={results} />
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <NoResults />
          </div>
        )}
        {info.pages > 1 && (
          <Pagination currentPage={page} totalPages={info.pages} buildPageUrl={buildPageUrl} />
        )}
      </div>
    );
  } catch {
    return <SomeError />;
  }
}
