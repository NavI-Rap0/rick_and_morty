import React from "react";
import "./SearchButton.css"; // Стилі для кнопки пошуку

// Тепер onClick приймає параметр e: React.FormEvent
const SearchButton = ({ onClick }: { onClick: (e: React.FormEvent) => void }) => {
  return (
    <button className="search-button" onClick={onClick}>
      Пошук
    </button>
  );
};

export default SearchButton;



