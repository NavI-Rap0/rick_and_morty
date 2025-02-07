"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/searchBar/SearchBar";
import Pagination from "@/components/Pagination";

type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
};

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${currentPage}`);
        const data = await response.json();
        setEpisodes(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        console.error("Помилка завантаження епізодів:", error);
      }
    };
    fetchEpisodes();
  }, [currentPage]);

  const handleSearch = (query: string) => {
    const filtered = episodes.filter((episode) =>
      episode.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEpisodes(filtered.length > 0 ? filtered : []);
  };

  const handlePageChange = (page: number) => `?page=${page}`;

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      <div className="mt-4">
        {(filteredEpisodes ? filteredEpisodes : episodes).length > 0 ? (
          (filteredEpisodes ?? episodes).map((episode) => (
            <div key={episode.id} className="p-4 mb-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold">{episode.name}</h2>
              <p className="text-gray-600">{episode.episode}</p>
              <p className="text-gray-500">{episode.air_date}</p>
            </div>
          ))
        ) : (
          <p>Епізоди не знайдено.</p>
        )}
      </div>

      {!filteredEpisodes && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}


  