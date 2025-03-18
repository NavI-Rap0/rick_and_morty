"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomDropdown from "./CustomDropdown";
import SearchBar from "./searchBar/SearchBar";
import { Statuses, Species, Genders } from "@/utils/constants";
import { buildFilterUrl } from "@/helpers/filterHelpers";
import { FilterProps } from "@/utils/types";

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
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4 bg-transparent rounded-md items-center max-w-[750px] mx-auto">

        <CustomDropdown
          label="Статус"
          options={Object.values(Statuses)}
          selectedOption={currentFilters?.status}
          onSelect={(status) => handleSelect("status", status)}
        />

        <CustomDropdown
          label="Вид"
          options={Object.values(Species)}
          selectedOption={currentFilters?.species}
          onSelect={(species) => handleSelect("species", species)}
        />

        <CustomDropdown
          label="Стать"
          options={Object.values(Genders)}
          selectedOption={currentFilters?.gender}
          onSelect={(gender) => handleSelect("gender", gender)}
        />
      </div>


      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

