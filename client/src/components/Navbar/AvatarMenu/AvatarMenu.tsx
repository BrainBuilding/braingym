import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserAuth } from "context/AuthContext";
import { Avatar } from "components/Avatar";
import { AvatarMenuStyled } from "./AvatarMenu.styles";
import { MenuStyled, MenuItem } from "components/Menu";

export const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logOut } = UserAuth();
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }

    handleClose();
  };

  if (!user) {
    return null;
  }

  return (
    <AvatarMenuStyled>
      <Avatar user={user} onClick={handleClick} />

      <MenuStyled
        className="popover-menu"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          iconName="ManageAccounts"
          to="/account"
          className="menu-item"
          onClick={handleClose}
        >
          {t("navigation.account")}
        </MenuItem>

        <MenuItem
          iconName="Logout"
          className="menu-item"
          onClick={handleSignOut}
        >
          {t("button.logout")}
        </MenuItem>
      </MenuStyled>
    </AvatarMenuStyled>
  );
};
