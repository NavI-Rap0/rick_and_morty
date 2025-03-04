import React from "react";
import Card from "./Card";

type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
};

interface LocationsListProps {
  locations: Location[];
}

export default function LocationsList({ locations }: LocationsListProps) {
  return (
    <div className="mt-4 w-full max-w-3xl">
      {locations.map((location) => (
        <Card key={location.id} {...location} />
      ))}
    </div>
  );
}


