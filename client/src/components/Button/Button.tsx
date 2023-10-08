import { TColors } from "types";
import { ButtonStyled } from "./Button.syles";

type TProps = {
  onClick?: () => any;
  disabled?: boolean;
  color?: TColors;
  hoverColor?: TColors;
};

export const Button: React.FC<React.PropsWithChildren<TProps>> = (props) => {
  const { onClick, children, disabled, color, hoverColor } = props;
  return (
    <ButtonStyled
      onClick={onClick}
      disabled={disabled}
      color={color}
      hoverColor={hoverColor}
      className="button"
    >
      {children}
    </ButtonStyled>
  );
};
