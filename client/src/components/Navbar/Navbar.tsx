import Logout from "@mui/icons-material/Logout";
import { Logo } from "components/Logo";
import { NavLink } from "components/Navbar/NavLink";
import { UserAuth } from "context/AuthContext";
import { NavbarStyled } from "./Navbar.styles";
import { Avatar } from "components/Avatar";

export const Navbar = () => {
  const { user, logOut } = UserAuth();

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
            <NavLink to="/">Chat</NavLink>
            <NavLink to="/account">Account</NavLink>
            <NavLink to="/alphabet">Alphabet</NavLink>
          </div>

          <div className="buttons-wrapper user-buttons-wrapper">
            <Avatar user={user} />

            <button
              title="Logout"
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
