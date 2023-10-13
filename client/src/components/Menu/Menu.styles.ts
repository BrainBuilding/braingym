import { styled } from "styled-components";
import Menu from "@mui/material/Menu";
import { colors } from "styles";

export const MenuStyled = styled(Menu)`
  .MuiPaper-root {
    background: ${colors.main};
    color: ${colors.white};
  }
`;
