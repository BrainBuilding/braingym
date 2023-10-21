import { TColors } from "types";
import { ButtonStyled } from "./Button.syles";

type TProps = {
  onClick?: () => any;
  disabled?: boolean;
  color?: TColors;
  hoverColor?: TColors;
  textColor?: TColors;
};

export const Button: React.FC<React.PropsWithChildren<TProps>> = (props) => {
  const { onClick, children, disabled, color, hoverColor, textColor } = props;
  return (
    <ButtonStyled
      onClick={onClick}
      disabled={disabled}
      color={color}
      hoverColor={hoverColor}
      textColor={textColor}
      className="button"
    >
      {children}
    </ButtonStyled>
  );
};
