import React from "react";
import Card from "./Card";

type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
};

interface EpisodesListProps {
  episodes: Episode[];
}

export default function EpisodesList({ episodes }: EpisodesListProps) {
  return (
    <div className="mt-4 w-full max-w-3xl">
      {episodes.map((episode) => (
        <Card key={episode.id} {...episode} />
      ))}
    </div>
  );
}

