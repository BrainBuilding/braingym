import { Outlet } from "react-router-dom";
import { SubNavbar } from "components/SubNavbar";
import { LettersStyled } from "./Letters.styles";

export const Letters = () => {
  return (
    <LettersStyled className="letters">
      <SubNavbar
        items={[
          { to: "learn", children: "Learn" },
          { to: "alphabet", children: "Alphabet" },
        ]}
      />

      <Outlet />
    </LettersStyled>
  );
};
