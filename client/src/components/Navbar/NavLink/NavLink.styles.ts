import styled from "styled-components";
import { colors, fontSizes, spaces } from "styles";

export const NavLinkStyled = styled.div`
  min-width: 60px;
  height: 100%;
  background: ${colors.main};
  padding: 0 ${spaces.sm};

  &:hover {
    background: ${colors.secondary};
  }

  .nav-link {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    font-family: sans-serif;
    font-size: ${fontSizes.md};
    color: ${colors.white};
    position: relative;
    justify-content: center;

    &.active {
      &::before {
        display: block;
        content: "";
        border-bottom: 2px solid ${colors.white};
        width: calc(100% - ${spaces.xl});
        position: absolute;
        left: ${spaces.lg};
        bottom: ${spaces.xs};
      }
    }
  }
`;
