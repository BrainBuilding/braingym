import { useGetLevelAndPoints } from "hooks/db";
import { letters } from "shared/constants/alphabet/armenian";

export const useActiveLetters = (): string[] => {
  const { level } = useGetLevelAndPoints({
    collectionName: "PointsAlphabet",
    levelPoints: 100,
  });

  const activeLettersCount = 3 + level;

  return letters.slice(level, activeLettersCount).map((letter) => letter.key);
};
