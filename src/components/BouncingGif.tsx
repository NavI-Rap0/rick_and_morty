"use client";
import Image from "next/image";
import { useEffect, useState, useRef, useReducer } from "react";
import { BouncingGifConstants as C } from "@/utils/constants";
import { movementReducer, getNextScale, PositionState } from "@/helpers/gifHelpers";

function useGifScaling() {
  const [scale, setScale] = useState(1);
  const sizeDirectionRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => setScale(getNextScale(scale, sizeDirectionRef)), 5000);
    return () => clearInterval(interval);
  }, [scale]);

  return scale;
}

function useGifMovement(scale: number) {
  const [state, dispatch] = useReducer(movementReducer, {
    x: 900,
    y: -50,
    dx: 1.5,
    dy: 1.2,
    rotation: 0,
    rotationDirection: Math.random() > 0.5 ? 1 : -1,
  } as PositionState);

  useEffect(() => {
    let animationFrame: number;

    const moveGif = () => {
      dispatch({ type: "MOVE", scale });
      animationFrame = requestAnimationFrame(moveGif);
    };

    animationFrame = requestAnimationFrame(moveGif);
    return () => cancelAnimationFrame(animationFrame);
  }, [scale]);

  return state;
}

export default function AnimatedGif() {
  const scale = useGifScaling();
  const { x, y, rotation } = useGifMovement(scale);

  return (
    <Image
      src="/morty_spice.gif"
      alt="Flying GIF"
      width={100}
      height={100}
      unoptimized
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${C.WIDTH * scale}px`,
        height: `${C.HEIGHT * scale}px`,
        zIndex: -10,
        pointerEvents: "none",
        transform: `rotate(${rotation}deg)`,
        transition: "width 4s ease, height 4s ease",
      }}
    />
  );
}










