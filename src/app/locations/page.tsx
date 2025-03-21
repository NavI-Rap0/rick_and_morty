import { fetchLocations } from "@/utils/fetchData";
import { buildLocationsPageUrl } from "@/helpers/pagesHelpers";
import SearchHandler from "@/components/SearchHandler";
import Pagination from "@/components/Pagination";
import SomeError from "@/components/SomeError";
import LocationsList from "@/components/LocationsList";
import NoResults from "@/components/NoResults";

interface SearchParams {
  page?: string;
  name?: string;
}

export default async function LocationsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const awaitedSearchParams = await searchParams;
  const currentPage = parseInt(awaitedSearchParams?.page ?? "1", 10);
  const searchQuery = awaitedSearchParams?.name ?? "";

  const data = await fetchLocations(currentPage, searchQuery);
  
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <SearchHandler />

      {data === null ? (
        <SomeError />
      ) : data.results.length > 0 ? (
        <>
          <LocationsList locations={data.results} />
          <Pagination
            currentPage={currentPage}
            totalPages={data.info.pages}
            buildPageUrl={(filters, page) => buildLocationsPageUrl({ ...filters, name: searchQuery }, page)}
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


