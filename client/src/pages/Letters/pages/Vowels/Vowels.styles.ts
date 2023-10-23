import styled from "styled-components";
import { colors, spaces } from "styles";

export const VowelsStyled = styled.div`
  padding: ${spaces.lg};
  flex-grow: 1;
  background-image: url(/images/fly-1.png);
  background-repeat: no-repeat;
  background-size: min(30vw, 30vh);
  background-position: bottom left;

  .alphabet-board {
    margin-top: ${spaces.md};

    .has-multiple-sound {
      background-color: ${colors.grayXLight};
      pointer-events: none;
    }
  }

  .button-wrapper {
    margin-top: ${spaces.lg};
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
