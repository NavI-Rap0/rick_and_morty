"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomDropdown from "./CustomDropdown";
import SearchBar from "./SearchBar";
import { Statuses, Species, Genders } from "@/utils/constants";
import { buildFilterUrl } from "@/helpers/filterHelpers";
import { FilterProps } from "@/utils/types";

const FILTERS = [
  { label: "Статус", key: "status", options: Object.values(Statuses) },
  { label: "Вид", key: "species", options: Object.values(Species) },
  { label: "Стать", key: "gender", options: Object.values(Genders) },
] as const;

export default function Filter({ currentFilters }: FilterProps) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelect = (category: "status" | "species" | "gender", value: string) => {
    if (isClient) {
      router.push(buildFilterUrl(currentFilters, category, value));
    }
  };

  const handleSearch = (query: string) => {
    if (isClient) {
      router.push(`/characters?name=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center gap-4 p-4 bg-transparent rounded-md items-center lg:max-w-[1050px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4 bg-transparent rounded-md items-center max-w-[750px]">
        
        {FILTERS.map(({ label, key, options }) => (
          <CustomDropdown
            key={key}
            label={label}
            options={options}
            selectedOption={currentFilters?.[key]}
            onSelect={(value) => handleSelect(key, value)}
          />
        ))}

      </div>

      <SearchBar onSearch={handleSearch} />
    </div>
  );
}


