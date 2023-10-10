import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SubNavbar } from "components/SubNavbar";
import { LettersStyled } from "./Letters.styles";

export const Letters = () => {
  const { t } = useTranslation();

  return (
    <LettersStyled className="letters">
      <SubNavbar
        items={[
          { to: "alphabet", children: t("navigation.alphabet") },
          { to: "vowels", children: t("navigation.vowels") },
        ]}
      />

      <Outlet />
    </LettersStyled>
  );
};
