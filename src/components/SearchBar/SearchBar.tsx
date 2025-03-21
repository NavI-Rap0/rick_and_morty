"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { handleClear } from "@/helpers/searchHelpers";

let debounceTimer: NodeJS.Timeout;

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const lastSearchQuery = useRef(searchQuery);
  const searchIconRef = useRef<HTMLButtonElement>(null!);
  const searchBarRef = useRef<HTMLLabelElement>(null!);

  const debouncedSearch = useCallback(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (lastSearchQuery.current !== searchQuery) {
        onSearch(searchQuery);
        lastSearchQuery.current = searchQuery;
      }
    }, 300);
  }, [searchQuery, onSearch]);

  useEffect(() => {
    debouncedSearch();
  }, [searchQuery, debouncedSearch]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  return (
    <label
      ref={searchBarRef}
      className={`relative max-w-[30rem] rounded-xl p-3 text-base transition-colors duration-300 ${
        isOpen ? "bg-white/15" : "bg-transparent"
      } flex items-center`}
    >
      {isOpen ? (
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center p-1 transition-colors duration-300 text-blue-500 hover:text-red-500"
          onClick={() => handleClear(setSearchQuery, setIsOpen, searchIconRef)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.8rem"
            height="1.8rem"
            viewBox="0,0,256,256"
          >
            <g fill="currentColor">
              <g transform="scale(8,8)">
                <path d="M16,3c-7.16797,0 -13,5.83203 -13,13c0,7.16797 5.83203,13 13,13c7.16797,0 13,-5.83203 13,-13c0,-7.16797 -5.83203,-13 -13,-13zM16,5c6.08594,0 11,4.91406 11,11c0,6.08594 -4.91406,11 -11,11c-6.08594,0 -11,-4.91406 -11,-11c0,-6.08594 4.91406,-11 11,-11zM12.21875,10.78125l-1.4375,1.4375l3.78125,3.78125l-3.78125,3.78125l1.4375,1.4375l3.78125,-3.78125l3.78125,3.78125l1.4375,-1.4375l-3.78125,-3.78125l3.78125,-3.78125l-1.4375,-1.4375l-3.78125,3.78125z"></path>
              </g>
            </g>
          </svg>
        </button>
      ) : (
<button
  type="button"
  className="flex items-center justify-center p-1 text-white/40 transition-colors duration-300 hover:text-blue-500 pointer-events-auto"
  onClick={() => setIsOpen(true)}
>
  <svg viewBox="0 0 17.7 17.7" width="1.8rem" height="1.8rem" fill="currentColor">
    <path d="M12.6 11.2C13.5 10 14 8.6 14 7c0-3.9-3.1-7-7-7S0 3.1 0 7s3.1 7 7 7c1.6 0 3-.5 4.2-1.4l5.1 5.1 1.4-1.4-5.1-5.1zM2 7c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z" />
  </svg>
</button>

      )}

      {isOpen && (
        <form onSubmit={(event) => event.preventDefault()} className="max-h-8">
        <input
          type="text"
          placeholder="Пошук..."
          value={searchQuery}
          onChange={handleInputChange}
          className="h-8 text-white bg-transparent border-0 outline-none font-bold p-0 transition-all duration-1000 transform origin-right w-0 focus:w-[10rem] sm:focus:w-[10rem] md:focus:w-[20rem] lg:focus:w-[20rem] caret-blue-500 caret-w-2"
          autoFocus
        />

        </form>
      )}
    </label>
  );
}
