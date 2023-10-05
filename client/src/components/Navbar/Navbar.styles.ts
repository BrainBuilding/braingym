import styled from "styled-components";
import { colors, fontSizes, spaces } from "styles";

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
    }

    .user-buttons-wrapper {
      justify-content: flex-end;
    }

    .log-out-button {
      background: #3da2f3;
      border: none;
      color: ${colors.white};
      font-size: ${fontSizes.md};
      cursor: pointer;
      display: flex;
      width: 50px;
      align-items: center;
      justify-content: center;

      &:hover {
        background: ${colors.secondary};
      }
    }
  }

  .logo {
    height: 100%;
  }
`;
