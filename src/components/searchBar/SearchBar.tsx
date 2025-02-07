"use client";
import { useState, useRef } from "react";
import SearchButton from "../searchButton/SearchButton";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchIconRef = useRef<HTMLButtonElement | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setIsOpen(false);
    setTimeout(() => searchIconRef.current?.focus(), 10);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <label className={`${styles.label} ${isOpen ? styles.open : ""}`}>
      {isOpen ? (
        <button type="button" className={styles.closeButton} onClick={handleClear}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" viewBox="0,0,256,256">
            <g fill="var(--primary-color)" className={styles.svgIcon}>
              <g transform="scale(8,8)">
                <path d="M16,3c-7.16797,0 -13,5.83203 -13,13c0,7.16797 5.83203,13 13,13c7.16797,0 13,-5.83203 13,-13c0,-7.16797 -5.83203,-13 -13,-13zM16,5c6.08594,0 11,4.91406 11,11c0,6.08594 -4.91406,11 -11,11c-6.08594,0 -11,-4.91406 -11,-11c0,-6.08594 4.91406,-11 11,-11zM12.21875,10.78125l-1.4375,1.4375l3.78125,3.78125l-3.78125,3.78125l1.4375,1.4375l3.78125,-3.78125l3.78125,3.78125l1.4375,-1.4375l-3.78125,-3.78125l3.78125,-3.78125l-1.4375,-1.4375l-3.78125,3.78125z"></path>
              </g>
            </g>
          </svg>
        </button>
      ) : (
        <button type="button" className={styles.button} onClick={handleOpen} ref={searchIconRef}>
          <svg viewBox="0 0 17.7 17.7" width="1.8rem" height="1.8rem">
            <path fill="currentColor" d="M12.6 11.2C13.5 10 14 8.6 14 7c0-3.9-3.1-7-7-7S0 3.1 0 7s3.1 7 7 7c1.6 0 3-.5 4.2-1.4l5.1 5.1 1.4-1.4-5.1-5.1zM2 7c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z"/>
          </svg>
        </button>
      )}

      {isOpen && (
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Пошук..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.input}
            autoFocus
          />
          <SearchButton onClick={handleSearch} />
        </form>
      )}
    </label>
  );
}

