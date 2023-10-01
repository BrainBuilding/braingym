import { AlphabetBoard } from "components/AlphabetBoard";
import { usePlaySound } from "components/AlphabetBoard/AlphabetBoard.hooks";
import { LearnAlphabetStyled } from "./LearnAlphabet.styles";

export const LearnAlphabet = () => {
  const playSound = usePlaySound();

  return (
    <LearnAlphabetStyled className="alphabet">
      <h1>Learn Alphabet</h1>

      <AlphabetBoard onClick={playSound} />
    </LearnAlphabetStyled>
  );
};
