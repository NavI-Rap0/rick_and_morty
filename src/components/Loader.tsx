"use client"; // Додаємо директиву "use client"

import { useLoader } from "../utils/contextLoader"; // імпортуємо useLoader

export default function Loader() {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

