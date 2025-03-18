"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const NoResults = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-transparent">
      <p className="text-xl font-bold text-white mb-4">Думаю, треба шукати деінде</p>
      <button
        onClick={() => router.push("/")}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg transition-all hover:bg-blue-700"
      >
        На головну
      </button>
      <div className="fixed bottom-5 right-5 w-32 h-32">
        <Image
          src="/speack.gif"
          alt="Говорить Рік"
          width={128}
          height={128}
          priority
        />
      </div>
    </div>
  );
};

export default NoResults;

