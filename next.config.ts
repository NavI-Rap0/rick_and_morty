import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Активує строгий режим React
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com", // Домен, з якого завантажуються зображення
        pathname: "/api/character/avatar/**", // Шаблон шляху для зображень
      },
    ],
  },
};

export default nextConfig;

