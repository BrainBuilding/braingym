import Logout from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";
import { Logo } from "components/Logo";
import { NavLink } from "components/Navbar/NavLink";
import { UserAuth } from "context/AuthContext";
import { NavbarStyled } from "./Navbar.styles";
import { Avatar } from "components/Avatar";

export const Navbar = () => {
  const { user, logOut } = UserAuth();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NavbarStyled className="nav-bar">
      <Logo />

      {user && (
        <div className="nav-bar-buttons">
          <div className="buttons-wrapper">
            <NavLink to="/">{t("navigation.chat")}</NavLink>
            <NavLink to="/account">{t("navigation.account")}</NavLink>
            <NavLink to="/letters">{t("navigation.letters")}</NavLink>
          </div>

          <div className="buttons-wrapper user-buttons-wrapper">
            <Avatar user={user} />

            <button
              title={t("button.logout")}
              className="log-out-button"
              onClick={handleSignOut}
            >
              <Logout />
            </button>
          </div>
        </div>
      )}
    </NavbarStyled>
  );
};
