import { styled } from "styled-components";
import { colors } from "styles";

type TProps = {
  percentage: number;
};

export const ProgressBarStyled = styled.div<TProps>`
  width: 100%;
  height: 20px;
  background-color: #ccc;
  border-radius: 4px;
  overflow: hidden;

  .progress-bar-fill {
    width: ${({ percentage }) => `${percentage}%`};
    height: 100%;
    background-color: ${colors.main};
    transition: width 0.3s ease-in-out;
    color: ${colors.white};
    text-align: center;
  }
`;
