import { MilitaryTech, SportsEsports } from "@mui/icons-material";
import { Logo } from "components/Logo";
import { NavLink } from "components/Navbar/NavLink";
import { UserAuth } from "context/AuthContext";
import { NavbarStyled } from "./Navbar.styles";
import { AvatarMenu } from "./AvatarMenu";

export const Navbar = () => {
  const { user } = UserAuth();

  return (
    <NavbarStyled className="nav-bar">
      <Logo />

      {user && (
        <div className="nav-bar-buttons">
          <div className="buttons-wrapper">
            <NavLink to="/tops">
              <MilitaryTech />
            </NavLink>

            <NavLink to="/letters">
              <SportsEsports />
            </NavLink>
          </div>

          <div className="buttons-wrapper user-buttons-wrapper">
            <AvatarMenu />
          </div>
        </div>
      )}
    </NavbarStyled>
  );
};
