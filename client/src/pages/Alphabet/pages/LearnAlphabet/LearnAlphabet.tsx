import { letters } from "constants/alphabet/armenian";
import { useCubeSizes } from "./LearnAlphabet.hooks";
import { LearnAlphabetStyled } from "./LearnAlphabet.styles";

export const LearnAlphabet = () => {
  const playSound = (letterKey: string) => {
    const audio = new Audio(`/sounds/alphabets/armenian/${letterKey}.mp3`);
    return () => audio.play();
  };

  const sizes = useCubeSizes();

  return (
    <LearnAlphabetStyled className="alphabet" sizes={sizes}>
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
    </LearnAlphabetStyled>
  );
};
