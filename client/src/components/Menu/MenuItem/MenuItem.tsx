import { MenuItemProps } from "@mui/material/MenuItem/MenuItem";
import { omit } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItemStyled } from "./MenuItem.styles";
import * as Icons from "@mui/icons-material";

export type IconNames = keyof typeof Icons;

type Props = { to?: string; iconName?: IconNames } & MenuItemProps;

export const MenuItem = (props: Props) => {
  const location = useLocation();
  const { children, to, onClick, iconName } = props;
  const omittedProps = omit(props, ["children", "to", "iconName"]);
  const navigate = useNavigate();

  const onItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (to) {
      navigate(to);
    }

    onClick?.(event);
  };

  const isActiveLink = !!to && location.pathname === to;

  const Icon = iconName ? Icons[iconName] : null;

  return (
    <MenuItemStyled {...omittedProps} onClick={onItemClick}>
      <div className={`wrapper ${isActiveLink ? "active" : ""}`}>
        {Icon ? <Icon className="menu-icon" /> : null} {children}
      </div>
    </MenuItemStyled>
  );
};
