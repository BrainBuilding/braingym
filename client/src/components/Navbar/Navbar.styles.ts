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


    .log-out-button {
      background: #3da2f3;
      border: none;
      color: ${colors.white};
      font-size: ${fontSizes.lg};

      &:hover {
        background: ${colors.secondary};
      }
    }
  }

  .logo {
    height: 100%;
  }
`;
