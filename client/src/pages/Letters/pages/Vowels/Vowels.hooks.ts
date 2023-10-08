import { letters } from "shared/constants/alphabet/armenian";

export const useVowels = (): string[] => {
  return letters.filter((letter) => letter.isVowel).map((letter) => letter.key);
};
