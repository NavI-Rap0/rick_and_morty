import React from "react";
import CharacterCard from "../CharacterCard/CharacterCard";
import NoResults from "../NoResults/NoResults";

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
    <div className="mt-8 w-full max-w-[230px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[1000px] px-4 mx-auto">
      {characters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {characters.map((character) => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[40vh] sm:h-[50vh] !h-[40vh]">
          <NoResults />
        </div>

      )}
    </div>
  );
}




