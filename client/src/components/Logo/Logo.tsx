import { useTranslation } from "react-i18next";
import { LogoStyled } from "./Logo.styles";

export const Logo = () => {
  const { t } = useTranslation();

  return (
    <LogoStyled>
      <div className="logo-wrapper">
        <img
          referrerPolicy="no-referrer"
          className="logo"
          src="/logo192.png"
          alt=""
        />
      </div>
      <span>{t("bzez")}</span>
    </LogoStyled>
  );
};
