import { styled } from "styled-components";
import { fontSizes, spaces, colors } from "styles";

export const AlphabetStyled = styled.div`
  padding: ${spaces.lg};

  .grid-container {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: ${spaces.sm};

    .grid-item {
      background-color: ${colors.rose};
      padding: ${spaces.md};
      aspect-ratio: 1;
      text-align: center;
      justify-content: center;
      display: flex;
      flex-direction: column;
      letter-spacing: ${spaces.xs};
      font-size: ${fontSizes.xl};
      cursor: pointer;
      color: ${colors.white};

      &:hover {
        background-color: ${colors.roseDark};
      }
    }
  }
`;
