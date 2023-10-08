import { styled } from "styled-components";
import { colors, fontSizes } from "styles";

const ratio = {
  small: 0.7,
  large: 1,
};

export const AlphabetBoardStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  max-width: 100%;

  &.small {
    grid-template-columns: repeat(
      auto-fill,
      minmax(${100 * ratio.small}px, 1fr)
    );

    .square {
      font-size: ${fontSizes.sm};
    }
  }

  .square {
    align-items: center;
    justify-content: center;
    display: flex;
    background-color: ${colors.rose};
    aspect-ratio: 1;
    user-select: none;
    cursor: pointer;
    color: ${colors.white};
    text-align: center;

    &:hover {
      background-color: ${colors.roseDark};
    }

    &.selected {
      background-color: ${colors.secondary};
    }
  }

  @media (max-width: 1080px) {
    & {
      grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
      gap: 5px;

      &.small {
        grid-template-columns: repeat(
          auto-fill,
          minmax(${70 * ratio.small}px, 1fr)
        );
      }
    }
  }

  @media (max-width: 600px) {
    & {
      grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
      gap: 5px;

      &.small {
        grid-template-columns: repeat(
          auto-fill,
          minmax(${50 * ratio.small}px, 1fr)
        );
      }
    }
  }
`;
