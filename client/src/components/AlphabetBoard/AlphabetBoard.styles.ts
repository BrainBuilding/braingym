import { styled } from "styled-components";
import { spaces, colors } from "styles";
import { TBoardSize } from "./AlphabetBoard";

type Props = {
  sizes: {
    rowsCount: number;
    colCount: number;
    cubeSize: number;
  };
  size: TBoardSize;
};

export const AlphabetBoardStyled = styled.div<Props>`
  width: ${({ size }) => (size === "small" ? "50%" : "100%")};
  display: grid;
  grid-template-columns: ${({ sizes }) => `repeat(${sizes.colCount}, 1fr)`};
  grid-template-rows: ${({ sizes }) => `repeat(${sizes.rowsCount}, 1fr)`};
  gap: ${spaces.sm};

  .grid-item {
    background-color: ${colors.rose};
    aspect-ratio: 1;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    letter-spacing: ${spaces.xs};
    font-size: ${({ sizes }) => `${sizes.cubeSize / 4}px`};
    cursor: pointer;
    color: ${colors.white};
    user-select: none;
    width: ${({ sizes }) => `${sizes.cubeSize}px`};

    &:hover {
      background-color: ${colors.roseDark};
    }

    &.selected {
      background-color: ${colors.secondary};
    }
  }
`;
