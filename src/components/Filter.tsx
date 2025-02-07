"use client";

import { useState } from "react";
import SearchBar from "./searchBar/SearchBar";

// Enum для фільтрів
enum Statuses {
  Alive = "alive",
  Dead = "dead",
  Unknown = "unknown",
}

enum Species {
  Human = "Human",
  Alien = "Alien",
  Robot = "Robot",
  Humanoid = "Humanoid",
}

enum Genders {
  Male = "Male",
  Female = "Female",
  Genderless = "Genderless",
  Unknown = "unknown",
}

type FilterProps = {
  currentFilters: Record<string, string | undefined>;
};

// Компонент Dropdown
function Dropdown({ label, options, selectedOption, onSelect }: {
  label: string;
  options: string[];
  selectedOption?: string;
  onSelect: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative justify-start">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-500 bg-opacity-50 border rounded hover:bg-gray-300 transition-all w-[11rem]"
      >
        {label}: {selectedOption || "Вибрати"}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border rounded shadow-lg w-[11rem]">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                selectedOption === option ? "bg-blue-500 text-white" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Filter({ currentFilters }: FilterProps) {
  const createFilterUrl = (category: "status" | "species" | "gender", value: string) => {
    const newFilters: Record<string, string | undefined> = { ...currentFilters };

    if (newFilters[category] === value) {
      delete newFilters[category];
    } else {
      newFilters[category] = value;
    }

    const validFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([, v]) => v !== undefined)
    ) as Record<string, string>;

    return `/characters?${new URLSearchParams(validFilters).toString()}`;
  };

  return (
    <div className="flex flex-row gap-4 p-4 bg-transparent rounded-md w-[100%] items-center">
      <Dropdown
        label="Статус"
        options={Object.values(Statuses)}
        selectedOption={currentFilters.status}
        onSelect={(status) => (window.location.href = createFilterUrl("status", status))}
      />

      <Dropdown
        label="Вид"
        options={Object.values(Species)}
        selectedOption={currentFilters.species}
        onSelect={(species) => (window.location.href = createFilterUrl("species", species))}
      />

      <Dropdown
        label="Стать"
        options={Object.values(Genders)}
        selectedOption={currentFilters.gender}
        onSelect={(gender) => (window.location.href = createFilterUrl("gender", gender))}
      />

      <SearchBar
        // initialQuery={currentFilters.name || ""}
        onSearch={(query) => (window.location.href = `/characters?name=${query}`)}
      />
    </div>
  );
}
