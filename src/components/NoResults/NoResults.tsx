"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const NoResults = () => {
  const router = useRouter();

  return (
    <div className=" flex z-100 flex-col items-center justify-center bg-transparent">
      <p className="text-xl font-bold text-white mb-4">О, чудово, Морті! Шукаємо деінде, бо ти знову все зіпсував!</p>
      <button
        onClick={() => router.push("/")}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg transition-all hover:bg-blue-700"
      >
        На головну
      </button>
      <div className="fixed bottom-0 right-0 w-320 h-320">
        <Image
          src="/speack.gif"
          alt="Говорить Фред"
          width={320}
          height={320}
          priority
          unoptimized
        />
      </div>
    </div>
  );
};

export default NoResults;

