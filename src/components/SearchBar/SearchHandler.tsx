"use client";

import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

export default function SearchHandler() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/episodes?name=${encodeURIComponent(query)}`);
  };

  return <SearchBar onSearch={handleSearch} />;
}
