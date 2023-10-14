import { styled } from "styled-components";
import { colors, fontSizes, spaces } from "styles";

export const LogoStyled = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${colors.white};
  font-size: ${fontSizes.xl};

  .logo-wrapper {
    aspect-ratio: 1;
    height: 100%;
    box-shadow: 2px 2px 2px ${colors.text};
    border-radius: 50%;
    margin-right: ${spaces.sm};
  }

  img {
    height: 100%;
    background: ${colors.compMain};
    border-radius: 50%;
    box-shadow: 2px 2px 2px ${colors.text} inset;
  }

  span {
    color: ${colors.compMain};
    text-shadow: 1px 1px 1px ${colors.black};
  }

  @media (max-width: 680px) {
    & {
      font-size: ${fontSizes.lg};
    }
  }

  @media (max-width: 400px) {
    span {
      display: none;
    }
  }
`;
