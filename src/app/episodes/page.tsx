import { fetchEpisodes } from "@/utils/fetchData";
import { buildEpisodesPageUrl } from "@/utils/helpers";
import SearchHandler from "@/components/SearchHandler";
import Pagination from "@/components/Pagination";
import SomeError from "@/components/SomeError";
import EpisodesList from "@/components/EpisodesList";

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
  if (!data || !data.results || data.results.length === 0) {
    return <SomeError />;
  }

  const { results: episodes, info } = data;

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <SearchHandler />
      <EpisodesList episodes={episodes} />
      <Pagination
        currentPage={currentPage}
        totalPages={info.pages}
        onPageChange={(page: number) => buildEpisodesPageUrl({ name: searchQuery }, page)}
      />
    </div>
  );
}
