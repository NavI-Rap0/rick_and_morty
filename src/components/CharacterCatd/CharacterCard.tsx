'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./CharacterCard.module.css"; // Стилі підключені тут

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
  status,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/character/${id}`);
  };

  return (
    <div className={styles.container} onClick={handleCardClick}>
      <div className={styles.canvas}>
        {/* Трекери для ефекту нахилу */}
        {[...Array(25)].map((_, i) => (
          <div key={i} className={`${styles.tracker} ${styles[`tr-${i + 1}`]}`}></div>
        ))}

        <div className={styles.card}>
            <Image src={image} alt={name} width={128} height={128} className={styles.avatar} />
          <h2 className={styles.title}>{name}</h2>

          <div className={styles.details}>
            <h3 className={styles.status}>{status}</h3>
            <p className={`${styles.species} ${styles[`species-${species.toLowerCase()}`]}`}>
              {species}
            </p>
            <p className={`${styles.gender} ${styles[`gender-${gender.toLowerCase()}`]}`}>
              {gender}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

