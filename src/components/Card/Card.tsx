import React from "react";

type CardProps = {
  id: number;
  name: string;
  type?: string;
  dimension?: string;
  residents?: string[];
  air_date?: string;
  episode?: string;
};

export default function Card({ name, type, dimension, residents, air_date, episode }: CardProps) {
  return (
    <div className="relative p-4 mb-4 rounded-lg shadow text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-400 opacity-50 blur-sm"></div>
      <div className="relative z-10">
        <h2 className="text-xl font-semibold">{name}</h2>
        {episode && <p className="text-gray-200">{episode}</p>}
        {air_date && <p className="text-gray-300">{air_date}</p>}
        {type && <p className="text-gray-200">Тип: {type}</p>}
        {dimension && <p className="text-gray-300">Вимір: {dimension}</p>}
        {residents && <p className="text-gray-400">Кількість мешканців: {residents.length}</p>}
      </div>
    </div>
  );
}


