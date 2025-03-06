"use client";
import { useState } from "react";
import Image from "next/image";
import MessageButton from "@/components/messageButton/MessageButton";
import { typeText } from "@/helpers/typeText";
import { startTextAnimation } from "@/helpers/textAnimationHelpers";

export default function AnimatedText({ children }: { children?: string }) {
  const [visibleText, setVisibleText] = useState("");
  const [started, setStarted] = useState(false);
  const [showRick, setShowRick] = useState(false);

  return (
    <div className="text-center">
      {!started && (
        <div onClick={() => startTextAnimation(children, setStarted, setShowRick, setVisibleText, typeText)}>
          <MessageButton />
        </div>
      )}

      <p className="md:text-3xl font-bold neon-text ml-10">{visibleText}</p>

      {showRick && (
        <Image
          src="/rick.png"
          alt="rick"
          width={250}
          height={250}
          className="fixed bottom-0 left-0 z-50"
        />
      )}
    </div>
  );
}


