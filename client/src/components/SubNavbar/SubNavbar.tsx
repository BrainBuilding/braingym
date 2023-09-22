import { NavLink } from "components/Navbar/NavLink";
import { SubNavbarStyled } from "./SubNavbar.styles";
import { TNavItem } from "types";

type Props = {
  items: TNavItem[];
};

export const SubNavbar: React.FC<Props> = (props) => {
  const { items } = props;

  return (
    <SubNavbarStyled className="nav-bar">
      <div className="nav-bar-buttons">
        {items.map((item) => (
          <NavLink key={`key-${item.to}`} {...item} />
        ))}
      </div>
    </SubNavbarStyled>
  );
};
