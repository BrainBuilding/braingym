import { TColors } from "types";
import { ButtonStyled } from "./Button.syles";

type TProps = {
  onClick?: () => any;
  disabled?: boolean;
  color?: TColors;
};

export const Button: React.FC<React.PropsWithChildren<TProps>> = (props) => {
  const { onClick, children, disabled, color } = props;
  return (
    <ButtonStyled
      onClick={onClick}
      disabled={disabled}
      color={color}
      className="button"
    >
      {children}
    </ButtonStyled>
  );
};
