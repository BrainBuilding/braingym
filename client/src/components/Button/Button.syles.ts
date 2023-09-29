import { styled } from "styled-components";
import { colors } from "../../styles";

type TProps = {
  disabled?: boolean;
};

export const ButtonStyled = styled.div<TProps>`
  width: 100px;
  background: ${colors.main};
  color: ${colors.white};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  height: 30px;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: ${colors.secondary};
  }
`;
