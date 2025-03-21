"use client";
import { useState } from "react";
import Image from "next/image";
import MessageButton from "@/components/MessageButton/MessageButton";
import { typeText } from "@/helpers/typeText";
import { startTextAnimation } from "@/helpers/textAnimationHelpers";

interface AnimatedTextProps {
  onFinish?: () => void;
  setStarted: (value: boolean) => void;
}

export default function AnimatedText({ onFinish, setStarted }: AnimatedTextProps) {
  const [visibleText, setVisibleText] = useState("");
  const [showRick, setShowRick] = useState(false);

  return (
    <div className="text-center">
      {!visibleText && (
        <div
          className="flex justify-center items-center h-full"
          onClick={() => {
            setStarted(true);
            startTextAnimation(
              "Congratulations, you miserable bag of molecules! I've messed up again, and now you're stuck between dimensions. The only way out is to explore the chaos of this universe!",
              () => setStarted(true),
              setShowRick,
              setVisibleText,
              typeText,
              onFinish
            );
          }}
        >
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


