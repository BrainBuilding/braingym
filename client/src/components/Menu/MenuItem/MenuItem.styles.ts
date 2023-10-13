import MenuItem from "@mui/material/MenuItem/MenuItem";
import { styled } from "styled-components";
import { colors, spaces } from "styles";

export const MenuItemStyled = styled(MenuItem)`
  padding: 0 !important;

  .wrapper {
    padding: ${spaces.md};
    display: flex;
    align-items: center;
    width: 100%;
    color: ${colors.white};

    &.active {
      background: ${colors.secondary};
    }

    .menu-icon {
      margin-right: ${spaces.sm};
    }
  }
`;
