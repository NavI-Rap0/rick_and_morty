import AnimatedText from "@/components/AnimatedMessage";
import Button from "@/components/Button";

export default function HomePage() {
  return (
    <div className="relative flex flex-row items-center justify-between h-[80vh] overflow-hidden text-blue">

      {/* Ліва частина */}
      <div className="relative z-10 w-[50vw] text-center">
        <AnimatedText>
          {"Congratulations, you miserable bag of molecules! I've messed up again, and now you're stuck between dimensions. The only way out is to explore the chaos of this universe!     "}
        </AnimatedText>
      </div>

      {/* Права частина */}
      <div className="flex w-[50vw] h-[80vh] flex-col text-center items-center justify-around">
        <ul className="mt-6 space-y-2 text-lg text-gray-300">
          <li> Characters – дізнайся, хто ти в цьому вимірі.</li>
          <li> Episodes – всі божевільні пригоди.</li>
          <li> Locations – досліджуй найдикіші локації!</li>
        </ul>

        <Button href="/characters">
          ВІДКРИТИ ПОРТАЛ
        </Button>
      </div>
      
    </div>
  );
}

