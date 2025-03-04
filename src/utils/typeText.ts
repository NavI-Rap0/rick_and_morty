export const typeText = (
    text: string,
    setVisibleText: React.Dispatch<React.SetStateAction<string>>,
    onFinish: () => void
  ) => {
    if (!text.trim()) return;
  
    let index = 0;
    setVisibleText(text[0]);
  
    const typeSound = new Audio("/sounds/rick.wav");
    typeSound.loop = true;
    typeSound.volume = 0.5;
    typeSound.play().catch((err) => console.error("Помилка звуку:", err));
  
    const interval = setInterval(() => {
      index++;
      setVisibleText((prev: string) => prev + text[index]); // Виправлений тип
  
      if (index >= text.length - 1) {
        clearInterval(interval);
        typeSound.pause();
        onFinish();
      }
    }, 50);
  };
  
  