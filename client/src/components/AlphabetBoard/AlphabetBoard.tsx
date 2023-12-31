import { letters as armenianLetters } from "shared/constants/alphabet/armenian";
import { TLetter } from "shared/types";
import { AlphabetBoardStyled } from "./AlphabetBoard.styles";

export type TBoardSize = "small" | "large";

type TProps = {
  onClick?: (letterKey: string) => any;
  selectedLetters?: string[];
  size?: TBoardSize;
  letters?: TLetter[];
};

export const AlphabetBoard: React.FC<TProps> = (props) => {
  const {
    onClick,
    selectedLetters = [],
    size = "large",
    letters = armenianLetters,
  } = props;

  return (
    <AlphabetBoardStyled className={`alphabet-board ${size}`}>
      {letters.map((letter) => (
        <div
          key={letter.key}
          className={`square letter letter-${letter.key} ${
            selectedLetters.includes(letter.key) ? "selected" : ""
          } ${letter.hasOneSound ? "has-one-sound" : "has-multiple-sound"}`}
          onClick={onClick?.(letter.key)}
        >
          {letter.value.uppercase} {letter.value.lowercase}
        </div>
      ))}
    </AlphabetBoardStyled>
  );
};
