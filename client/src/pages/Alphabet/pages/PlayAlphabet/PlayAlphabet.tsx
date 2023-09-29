import { AvailablePoints } from "components/AvailablePoints";
import { AlphabetBoard } from "components/AlphabetBoard";
import { useState } from "react";
import { Dictionary } from "lodash";
import { useGetAlphabetLevel } from "./PlayAlphabet.hooks";
import { Button } from "components/Button";

export const PlayAlphabet = () => {
  const [selectedLetters, setSelectedLetters] = useState<Dictionary<boolean>>(
    {}
  );

  const level = useGetAlphabetLevel();

  const selectedLettersCount =
    Object.values(selectedLetters).filter(Boolean).length;
  const allowedLettersCount = level * 3;

  const leftToSelectCount = allowedLettersCount - selectedLettersCount;

  const onChooseLetter = (letter: string) => {
    return () =>
      setSelectedLetters((currentSelectedLetters) => {
        const newValue = !currentSelectedLetters[letter];

        if (!leftToSelectCount && newValue) {
          return currentSelectedLetters;
        }

        return { ...currentSelectedLetters, [letter]: newValue };
      });
  };

  return (
    <div>
      <h1>PlayAlphabet</h1>
      <AvailablePoints />
      <div>Level: {level}</div>

      <div>
        <AlphabetBoard
          size="small"
          onClick={onChooseLetter}
          selectedLetters={selectedLetters}
        />
        <div>Left to select {leftToSelectCount} letters.</div>

        <Button disabled={!!leftToSelectCount}>Play</Button>
      </div>
    </div>
  );
};
