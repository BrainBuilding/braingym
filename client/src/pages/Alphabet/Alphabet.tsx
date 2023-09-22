import { Outlet } from "react-router-dom";
import { SubNavbar } from "components/SubNavbar";
import { AlphabetStyled } from "./Alphabet.styles";

export const Alphabet = () => {
  return (
    <AlphabetStyled className="alphabet">
      <SubNavbar
        items={[
          { to: "learn", children: "Learn" },
          { to: "play", children: "Play" },
        ]}
      />

      <Outlet />
    </AlphabetStyled>
  );
};
