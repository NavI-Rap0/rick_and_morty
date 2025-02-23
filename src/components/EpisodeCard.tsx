import React from "react";

type EpisodeCardProps = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
};

export default function EpisodeCard({ name, air_date, episode }: EpisodeCardProps) {
  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600">{episode}</p>
      <p className="text-gray-500">{air_date}</p>
    </div>
  );
}
