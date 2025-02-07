"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/searchBar/SearchBar";
import Pagination from "@/components/Pagination";

type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
};

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/location?page=${currentPage}`);
        const data = await response.json();
        setLocations(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        console.error("Помилка завантаження локацій:", error);
      }
    };
    fetchLocations();
  }, [currentPage]);

  const handleSearch = (query: string) => {
    const filtered = locations.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLocations(filtered.length > 0 ? filtered : []);
  };

  const handlePageChange = (page: number) => `?page=${page}`;

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      <div className="mt-4">
        {(filteredLocations ? filteredLocations : locations).length > 0 ? (
          (filteredLocations ?? locations).map((location) => (
            <div key={location.id} className="p-4 mb-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold">{location.name}</h2>
              <p className="text-gray-600">Тип: {location.type}</p>
              <p className="text-gray-500">Вимір: {location.dimension}</p>
              <p className="text-gray-400">Кількість мешканців: {location.residents.length}</p>
            </div>
          ))
        ) : (
          <p>Локації не знайдено.</p>
        )}
      </div>

      {!filteredLocations && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
  