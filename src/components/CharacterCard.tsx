'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

type CharacterProps = {
  id: number;
  name: string;
  gender: string;
  species: string;
  image: string;
  status: string;
};

const CharacterCard: React.FC<CharacterProps> = ({
  id,
  name,
  gender,
  species,
  image,
}) => {
  const router = useRouter();

  // Функція для визначення кольору кружечка залежно від виду
  const getSpeciesColor = (species: string) => {
    switch (species.toLowerCase()) {
      case "alien":
        return "bg-green-500";
      case "human":
        return "bg-blue-500";
      default:
        return "bg-red-500";
    }
  };

  // Функція для визначення кольору тексту статі
  const getGenderColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "female":
        return "text-pink-500";
      case "male":
        return "text-blue-500";
      default:
        return "text-purple-500";
    }
  };

  const handleCardClick = () => {
    router.push(`/character/${id}`);
  };

  return (
    <div
      key={id}
      className="bg-white/20 hover:bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer transition-all duration-300 transform hover:scale-105 w-64 h-[300px]"
      onClick={handleCardClick}
    >
      <Image
        src={image}
        alt={name}
        width={128}
        height={128}
        className="rounded-full mb-4"
      />
      <h2 className="text-xl font-bold text-primary text-center">{name}</h2>
      <h2 className="text-xl font-bold text-primary text-center">{status}</h2>

      {/* Вид */}
      <div className="flex items-center mt-2">
        <p className="text-gray-900 text-lg mr-2">{species}</p>
        <span
          className={`inline-block w-3 h-3 rounded-full mr-2 ${getSpeciesColor(
            species
          )}`}
        ></span>
      </div>

      {/* Стать */}
      <p className={`text-sm font-medium mt-2 ${getGenderColor(gender)}`}>
        {gender}
      </p>
    </div>
  );
};

export default CharacterCard;


