import { useCallback } from "react";

export const usePlaySound = () => {
  return useCallback((letterKey: string) => {
    const audio = new Audio(`/sounds/alphabets/armenian/${letterKey}.mp3`);

    return () => audio.play();
  }, []);
};
