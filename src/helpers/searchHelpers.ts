export const handleSearch = (
  e: React.FormEvent,
  searchQuery: string,
  onSearch: (query: string) => void
) => {
  e.preventDefault();
  if (searchQuery.trim() !== "") {
    onSearch(searchQuery);
  }
};

export const handleClear = (
  setSearchQuery: (value: string) => void,
  setIsOpen: (value: boolean) => void,
  searchIconRef: React.RefObject<HTMLButtonElement>
) => {
  setSearchQuery("");
  setIsOpen(false);
  setTimeout(() => searchIconRef.current?.focus(), 10);
};
