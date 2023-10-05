import { styled } from "styled-components";
import { colors, fontSizes, spaces } from "styles";

export const LevelAndPointsStyled = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  max-width: 300px;

  .label {
    font-size: ${fontSizes.lg};
    color: ${colors.text};
    margin-right: ${spaces.sm};
  }

  .current-level {
    font-size: ${fontSizes.xl};
    color: ${colors.yellow};
    margin-right: ${spaces.sm};
  }
`;
