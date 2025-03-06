export const startTextAnimation = (
    text: string | undefined,
    setStarted: React.Dispatch<React.SetStateAction<boolean>>,
    setShowRick: React.Dispatch<React.SetStateAction<boolean>>,
    setVisibleText: React.Dispatch<React.SetStateAction<string>>,
    typeText: (text: string, setText: React.Dispatch<React.SetStateAction<string>>, callback: () => void) => void
  ) => {
    if (!text) return;
    setStarted(true);
    setShowRick(true);
    typeText(text, setVisibleText, () => setShowRick(false));
  };
  