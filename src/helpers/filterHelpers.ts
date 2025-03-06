import { FilterProps } from "@/utils/types";

export function buildFilterUrl(
  currentFilters: FilterProps["currentFilters"],
  category: "status" | "species" | "gender",
  value: string
): string {
  const newFilters = { ...currentFilters };

  if (newFilters[category] === value) {
    delete newFilters[category];
  } else {
    newFilters[category] = value;
  }

  const validFilters = Object.fromEntries(
    Object.entries(newFilters).filter(([, val]) => val !== undefined && val !== "")
  );

  const query = new URLSearchParams(validFilters).toString();
  return `/characters${query ? "?" + query : ""}`;
}

