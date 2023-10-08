import { VowelsStyled } from "./Vowels.styles";
import { LevelAndPoints } from "components/LevelAndPoints";
import { AlphabetBoard } from "components/AlphabetBoard";
import { Button } from "components/Button";
import { usePlaySound } from "components/AlphabetBoard/AlphabetBoard.hooks";
import { useVowels } from "./Vowels.hooks";

export const Vowels = () => {
  const playSound = usePlaySound();
  const vowels = useVowels();

  return (
    <VowelsStyled>
      <LevelAndPoints levelPoints={50} collectionName="PointsVowels" />

      <div>
        <AlphabetBoard
          onClick={playSound}
          size="small"
          selectedLetters={vowels}
        />

        <div className="buttons-wrapper">
          <Button color="secondary">Ձայնավոր</Button>
          <Button color="rose" hoverColor="roseDark">
            Բաղաձայն
          </Button>
        </div>
      </div>
    </VowelsStyled>
  );
};
