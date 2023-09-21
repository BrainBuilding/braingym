import { NavLink as NavLinkReact } from "react-router-dom";
import { NavLinkStyled } from "./NavLink.styles";

type TProps = React.PropsWithChildren<{
  to: string;
}>;

export const NavLink = (props: TProps) => {
  return (
    <NavLinkStyled>
      <NavLinkReact className="nav-link" to={props.to}>
        {props.children}
      </NavLinkReact>
    </NavLinkStyled>
  );
};
