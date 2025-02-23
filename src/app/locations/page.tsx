import { fetchLocations } from "@/utils/fetchData";
import { buildLocationsPageUrl } from "@/utils/helpers";
import SearchHandler from "@/components/SearchHandler";
import Pagination from "@/components/Pagination";
import SomeError from "@/components/SomeError";
import LocationsList from "@/components/LocationsList";

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
  if (data === null) {
    return <SomeError />;
  }

  const { results: locations, info } = data;

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <SearchHandler />
      {locations.length > 0 ? (
        <>
          <LocationsList locations={locations} />
          <Pagination
            currentPage={currentPage}
            totalPages={info.pages}
            onPageChange={(page: number) => buildLocationsPageUrl({ name: searchQuery }, page)}
          />
        </>
      ) : (
        <p className="text-gray-500 mt-4">Локації не знайдено.</p>
      )}
    </div>
  );
}


