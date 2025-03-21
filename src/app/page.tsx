"use client";

import { useState } from "react";
import AnimatedText from "@/components/AnimatedMessage";
import PortalLink from "@/components/PortalLink";

export default function HomePage() {
  const [textFinished, setTextFinished] = useState(false);
  const [started, setStarted] = useState(false);

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center h-[80vh] overflow-hidden text-blue">

      <div
        className={`relative z-10 transition-all duration-1000 flex justify-center 
          ${started ? "md:w-[50vw] text-center" : "w-full h-full items-center"}`}
      >
        <AnimatedText onFinish={() => setTextFinished(true)} setStarted={setStarted} />
      </div>


      <div
        className={`flex flex-col items-center justify-around text-center transition-opacity duration-1000
          ${textFinished ? "opacity-100" : "opacity-0"} 
          w-full md:w-[50vw] h-auto md:h-[80vh]`}
      >
        <PortalLink />
      </div>
    </div>
  );
}



