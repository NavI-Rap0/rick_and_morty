import Image from "next/image";
import styles from "./MessageButton.module.css";

export default function MessageButton() {
  return (
    <button id="btn-message" className={styles.buttonMessage}>
      <div className={styles.contentAvatar}>
        <div className={styles.statusUser}></div>
        <div className={styles.avatar}>
          <Image
            src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
            alt="avatar"
            width={50} 
            height={50}
            className={styles.avatarImg}
          />
        </div>
      </div>
      <div className={styles.noticeContent}>
        <div className={styles.username}>Rick Sanchez</div>
        <div className={styles.lableMessage}>
          Message<span className={styles.numberMessage}>1</span>
        </div>
        <div className={styles.userId}>@ricksanchez</div>
      </div>
    </button>
  );
}
