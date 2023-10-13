import { styled } from "styled-components";
import { colors, fontSizes, spaces } from "styles";

export const LogoStyled = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${colors.white};
  font-size: ${fontSizes.xl};

  img {
    height: 100%;
    margin-right: ${spaces.sm};
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
