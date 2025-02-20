"use client";
import React from "react";
import AnimatedGif from "../BouncingGif";
import styles from "./SpaceBackground.module.css";

export default function SpaceBackground() {
  return (
    <div className={styles.space}>
      <AnimatedGif />
    </div>
  );
}
