import { fetchEpisodes } from "@/utils/fetchData";
import { buildEpisodesPageUrl } from "@/helpers/pagesHelpers";
import SearchHandler from "@/components/SearchBar/SearchHandler";
import Pagination from "@/components/Pagination/Pagination";
import EpisodesList from "@/components/EpisodesList/EpisodesList";
import NoResults from "@/components/NoResults/NoResults";

interface SearchParams {
  page?: string;
  name?: string;
}

export default async function EpisodesPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const awaitedSearchParams = await searchParams;
  const currentPage = parseInt(awaitedSearchParams?.page ?? "1", 10);
  const searchQuery = awaitedSearchParams?.name ?? "";

  const data = await fetchEpisodes(currentPage, searchQuery);

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <SearchHandler /> 

      {data && data.results.length > 0 ? (
        <>
          <EpisodesList episodes={data.results} />
          <Pagination
            currentPage={currentPage}
            totalPages={data.info.pages}
            buildPageUrl={(filters, page) => buildEpisodesPageUrl({ ...filters, name: searchQuery }, page)}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-[40vh] sm:h-[50vh] !h-[40vh]">
          <NoResults />
        </div>
      )}
    </div>
  );
}
