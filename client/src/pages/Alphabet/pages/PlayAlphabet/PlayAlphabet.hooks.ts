import { useCallback, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "configs/firebaseConfig";
import { UserAuth } from "context/AuthContext";
import { usePlaySound } from "components/AlphabetBoard/AlphabetBoard.hooks";

export const useGetAlphabetLevel = () => {
  const { user } = UserAuth();
  const [level, setLevel] = useState<number>(1);

  const fetchALevel = async (authUid: string) => {
    const levelSnapshot = await getDoc(
      doc(fireDB, "GameUserLevels", `alphabet-${authUid}`)
    );
    const levelInfo = levelSnapshot.exists() ? levelSnapshot.data() : false;

    if (levelInfo) {
      setLevel(levelInfo.level);
    }
  };

  useEffect(() => {
    if (user?.authUid) {
      fetchALevel(user?.authUid);
    }
  }, [user?.authUid]);

  return level;
};

export const useSelectLetters = (
  selectedLetters: string[],
  setSelectedLetters: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const level = useGetAlphabetLevel();
  const playSound = usePlaySound();

  const selectedLettersCount =
    Object.values(selectedLetters).filter(Boolean).length;
  const allowedLettersCount = level * 3;

  const leftToSelectCount = allowedLettersCount - selectedLettersCount;

  const onChooseLetter = useCallback(
    (letter: string) => {
      return () => {
        setSelectedLetters((currentSelectedLetters) => {
          if (currentSelectedLetters.includes(letter)) {
            currentSelectedLetters.splice(
              currentSelectedLetters.indexOf(letter),
              1
            );
          } else if (leftToSelectCount > 0) {
            playSound(letter)();
            currentSelectedLetters.push(letter);
          }

          return [...currentSelectedLetters];
        });
      };
    },
    [leftToSelectCount, playSound, setSelectedLetters]
  );

  return {
    level,
    onChooseLetter,
    leftToSelectCount,
  };
};
