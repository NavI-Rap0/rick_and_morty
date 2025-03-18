"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function PortalLink() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/characters"
      className="relative flex items-center justify-center transition-transform duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: `url('/cursor.png'), auto`,
      }}
    >
      <div
        className={`absolute w-[120%] h-[120%] bg-blue-400 rounded-full blur-lg opacity-50 transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <div className="relative w-[300px] h-[300px]">
        <Image
          src="/portal-rick-and-morty.gif"
          alt="Портал"
          fill
          className={`transition-transform duration-300 ${
            hovered ? "scale-110" : "scale-100"
          }`}
          priority
          unoptimized
        />
      </div>
    </Link>
  );
}
