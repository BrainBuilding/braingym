import styled from "styled-components";
import { colors, spaces } from "styles";

export const SubNavbarStyled = styled.div`
  height: 40px;
  background: ${colors.main};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 ${spaces.lg};
  border-top: 1px solid ${colors.secondary};

  .nav-bar-buttons {
    display: flex;
    height: 100%;
  }
`;
