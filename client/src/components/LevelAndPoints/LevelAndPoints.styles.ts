import { styled } from "styled-components";
import { colors, fontSizes, spaces } from "styles";

export const LevelAndPointsStyled = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 300px;

  .label {
    font-size: ${fontSizes.lg};
    color: ${colors.text};
    margin-right: ${spaces.sm};
  }

  .level-info-wrapper {
    display: flex;
  }

  .current-level {
    font-size: ${fontSizes.xl};
    color: ${colors.yellow};
    margin-right: ${spaces.sm};
  }

  .starts-wrapper {
    display: flex;
  }
`;
