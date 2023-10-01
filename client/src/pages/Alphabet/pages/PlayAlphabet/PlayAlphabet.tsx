import { AvailablePoints } from "components/AvailablePoints";
import { AlphabetBoard } from "components/AlphabetBoard";
import { useState } from "react";
import { useSelectLetters } from "./PlayAlphabet.hooks";
import { Button } from "components/Button";

export const PlayAlphabet = () => {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const { level, onChooseLetter, leftToSelectCount } = useSelectLetters(
    selectedLetters,
    setSelectedLetters
  );

  const onPlay = () => {
    console.log("selectedLetters[log]::", selectedLetters);
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

        <Button onClick={onPlay} disabled={!!leftToSelectCount}>
          Play
        </Button>
      </div>
    </div>
  );
};
