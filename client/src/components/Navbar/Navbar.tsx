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

      <div className="nav-bar-buttons">
        <NavLink to="/">Chat</NavLink>
        <NavLink to="/account">Account</NavLink>
        {user && <button onClick={handleSignOut}>Log-out</button>}
        {user && <Avatar user={user} />}
      </div>
    </NavbarStyled>
  );
};
