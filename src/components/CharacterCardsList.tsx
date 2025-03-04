import React from "react";
import CharacterCard from "./CharacterCatd/CharacterCard";

type Character = {
  id: number;
  name: string;
  gender: string;
  species: string;
  image: string;
  status: string;
};

interface CharacterCardsListProps {
  characters: Character[];
}

export default function CharacterCardsList({ characters }: CharacterCardsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 ">
      {characters.map((character) => (
        <CharacterCard key={character.id} {...character} />
      ))}
    </div>
  );
}
