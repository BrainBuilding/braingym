import { Outlet } from "react-router-dom";
import { SubNavbar } from "components/SubNavbar";
import { LettersStyled } from "./Letters.styles";

export const Letters = () => {
  return (
    <LettersStyled className="letters">
      <SubNavbar
        items={[
          { to: "alphabet", children: "Alphabet" },
          { to: "vowels", children: "Vowels" },
        ]}
      />

      <Outlet />
    </LettersStyled>
  );
};
