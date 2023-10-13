import { LogoStyled } from "./Logo.styles";

export const Logo = () => {
  return (
    <LogoStyled>
      <img
        referrerPolicy="no-referrer"
        className="logo"
        src="/logo192.png"
        alt=""
      />
      <span>Mosaic</span>
    </LogoStyled>
  );
};
