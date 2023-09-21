import { letters } from "constants/alphabet/armenian";
import { AlphabetStyled } from "./Alphabet.styles";

export const Alphabet = () => {
  const playSound = (letterKey: string) => {
    const audio = new Audio(`sounds/alphabets/armenian/${letterKey}.mp3`);
    return () => audio.play();
  };

  return (
    <AlphabetStyled className="alphabet">
      <h1>Learn Alphabet</h1>

      <div className="grid-container letters-container">
        {letters.map((letter) => (
          <div
            key={letter.key}
            className="grid-item letter"
            onClick={playSound(letter.key)}
          >
            {letter.value.uppercase} {letter.value.lowercase}
          </div>
        ))}
      </div>
    </AlphabetStyled>
  );
};
