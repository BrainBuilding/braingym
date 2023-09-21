import styled from "styled-components";
import { colors, fontSizes, spaces } from "styles";

export const NavLinkStyled = styled.div`
  width: 100px;
  height: 100%;
  background: ${colors.main};

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
    font-size: ${fontSizes.lg};
    color: ${colors.white};
    position: relative;

    &.active {
      &::before {
        display: block;
        content: '';
        border-bottom: 2px solid ${colors.white};
        width: calc(100% - ${spaces.lg});
        position: absolute;
        left: ${spaces.sm};
        bottom: ${spaces.md};
      }
    }
  }
`;
