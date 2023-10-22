import { useTranslation } from "react-i18next";
import { Logo } from "components/Logo";
import { NavLink } from "components/Navbar/NavLink";
import { UserAuth } from "context/AuthContext";
import { NavbarStyled } from "./Navbar.styles";
import { AvatarMenu } from "./AvatarMenu";

export const Navbar = () => {
  const { user } = UserAuth();
  const { t } = useTranslation();

  return (
    <NavbarStyled className="nav-bar">
      <Logo />

      {user && (
        <div className="nav-bar-buttons">
          <div className="buttons-wrapper">
            <NavLink to="/tops">{t("navigation.tops")}</NavLink>
            <NavLink to="/letters">{t("navigation.letters")}</NavLink>
          </div>

          <div className="buttons-wrapper user-buttons-wrapper">
            <AvatarMenu />
          </div>
        </div>
      )}
    </NavbarStyled>
  );
};
