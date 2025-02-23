import React from "react";

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
        <div key={location.id} className="p-4 mb-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold">{location.name}</h2>
          <p className="text-gray-600">Тип: {location.type}</p>
          <p className="text-gray-500">Вимір: {location.dimension}</p>
          <p className="text-gray-400">Кількість мешканців: {location.residents.length}</p>
        </div>
      ))}
    </div>
  );
}

