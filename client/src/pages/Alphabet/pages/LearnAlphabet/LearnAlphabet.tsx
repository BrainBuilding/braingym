import { AlphabetBoard } from "components/AlphabetBoard";
import { LearnAlphabetStyled } from "./LearnAlphabet.styles";

export const LearnAlphabet = () => {
  const playSound = (letterKey: string) => {
    const audio = new Audio(`/sounds/alphabets/armenian/${letterKey}.mp3`);
    return () => audio.play();
  };

  return (
    <LearnAlphabetStyled className="alphabet">
      <h1>Learn Alphabet</h1>

      <AlphabetBoard onClick={playSound} />
    </LearnAlphabetStyled>
  );
};
