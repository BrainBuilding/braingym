import styled from "styled-components";
import { colors, spaces } from "styles";

export const VowelsStyled = styled.div`
  padding: ${spaces.lg};

  .alphabet-board {
    margin-top: ${spaces.md};

    .has-multiple-sound {
      background-color: ${colors.grayXLight};
      pointer-events: none;
    }
  }

  .buttons-wrapper {
    display: flex;
    flex-direction: row;
    margin-top: ${spaces.lg};
    justify-content: center;

    .button {
      &:not(:last-child) {
        margin-right: ${spaces.lg};
      }
    }
  }
`;
