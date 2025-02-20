"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomDropdown from "./CustomDropdown";
import SearchBar from "./searchBar/SearchBar";

enum Statuses {
  Alive = "alive",
  Dead = "dead",
  Unknown = "unknown",
}

enum Species {
  Alien = "alien",
  Animal = "animal",
  Robot = "robot",
  Human = "human",
  Humanoid = "humanoid",
  MythologicalCreature = "mythological creature",
  Unknown = "unknown",
}

enum Genders {
  Male = "male",
  Female = "female",
  Genderless = "genderless",
  Unknown = "unknown",
}

interface FilterProps {
  currentFilters: {
    status?: string;
    species?: string;
    gender?: string;
    name?: string;
  };
}

/**
 * Формує URL для переходу до /characters із застосованими фільтрами.
 */
function buildFilterUrl(
  currentFilters: FilterProps["currentFilters"],
  category: "status" | "species" | "gender",
  value: string
): string {
  const newFilters = { ...currentFilters };

  // Якщо значення вже встановлено – видаляємо його, інакше додаємо
  if (newFilters[category] === value) {
    delete newFilters[category];
  } else {
    newFilters[category] = value;
  }

  // Формуємо валідний об'єкт фільтрів
  const validFilters = Object.fromEntries(
    Object.entries(newFilters).filter(([, val]) => val !== undefined && val !== "")
  );

  // Формуємо рядок запиту
  const query = new URLSearchParams(validFilters).toString();
  return `/characters${query ? "?" + query : ""}`;
}

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
    <div className="flex flex-row gap-4 p-4 bg-transparent rounded-md w-full items-center">
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

      <SearchBar onSearch={handleSearch} />
    </div>
  );
}
