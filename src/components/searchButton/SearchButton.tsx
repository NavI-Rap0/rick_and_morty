import React from "react";
import "./SearchButton.css";

const SearchButton = ({ onClick }: { onClick: (event: React.FormEvent) => void }) => {
  return (
    <button className="search-button" onClick={onClick}>
      Пошук
    </button>
  );
};

export default SearchButton;



