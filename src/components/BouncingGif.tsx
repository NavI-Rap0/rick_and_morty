"use client";
import Image from "next/image";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";

export default function AnimatedGif() {
  const sizeSteps = useMemo(() => [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5], []);
  const [scale, setScale] = useState(1);

  const [position, setPosition] = useState({ x: 900, y: -50 });
  const [velocity, setVelocity] = useState({ dx: 1.5, dy: 1.2 });
  const rotationRef = useRef(0);
  const [sizeDirection, setSizeDirection] = useState(1);
  const rotationDirectionRef = useRef(Math.random() > 0.5 ? 1 : -1);

  const getNextScale = useCallback(() => {
    const currentIndex = sizeSteps.indexOf(scale);
    if (currentIndex === -1) return scale;

    let nextIndex = currentIndex + sizeDirection;

    if (nextIndex >= sizeSteps.length) {
      nextIndex = sizeSteps.length - 2;
      setSizeDirection(-1);
    } else if (nextIndex < 0) {
      nextIndex = 1;
      setSizeDirection(1);
    }

    return sizeSteps[nextIndex];
  }, [scale, sizeDirection, sizeSteps]);

  useEffect(() => {
    let animationFrame: number;

    const moveGif = () => {
      setPosition((prev) => {
        const gifWidth = 60 * scale;
        const gifHeight = 90 * scale;

        let newX = prev.x + velocity.dx;
        let newY = prev.y + velocity.dy;

        let newDX = velocity.dx;
        let newDY = velocity.dy;

        const parentWidth = 3000; // Умовний розмір 300vw
        const parentHeight = 3000; // Умовний розмір 300vh

        if (newX <= -50 || newX + gifWidth >= parentWidth) {
          newDX = -newDX;
          newX = Math.max(-50, Math.min(newX, parentWidth - gifWidth));
          rotationDirectionRef.current *= -1;
        }
        if (newY <= -50 || newY + gifHeight >= parentHeight) {
          newDY = -newDY;
          newY = Math.max(-50, Math.min(newY, parentHeight - gifHeight));
          rotationDirectionRef.current *= -1;
        }

        setVelocity({ dx: newDX, dy: newDY });
        return { x: newX, y: newY };
      });

      rotationRef.current += rotationDirectionRef.current * 0.3;

      animationFrame = requestAnimationFrame(moveGif);
    };

    animationFrame = requestAnimationFrame(moveGif);
    return () => cancelAnimationFrame(animationFrame);
  }, [velocity, scale]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale(getNextScale());
    }, 5000);

    return () => clearInterval(interval);
  }, [getNextScale]);

  return (
    <Image
      src="/morty_spice.gif"
      alt="Flying GIF"
      width={100}
      height={100}
      unoptimized
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${60 * scale}px`,
        height: `${90 * scale}px`,
        zIndex: -10,
        pointerEvents: "none",
        transform: `rotate(${rotationRef.current}deg)`,
        transition: "width 4s ease, height 4s ease",
      }}
    />
  );
}







