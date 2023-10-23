import styled from "styled-components";
import { colors, spaces } from "styles";

export const NavbarStyled = styled.div`
  height: 50px;
  background: ${colors.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${spaces.lg};

  .nav-bar-buttons {
    display: flex;
    height: 100%;

    .buttons-wrapper {
      display: flex;

      svg {
        transform: scale(1.3);
      }
    }

    .user-buttons-wrapper {
      justify-content: flex-end;
      max-width: 100px;
    }
  }
`;
