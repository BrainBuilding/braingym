import { ButtonStyled } from "./Button.syles";

type TProps = {
  onClick?: () => any;
  disabled?: boolean;
};

export const Button: React.FC<React.PropsWithChildren<TProps>> = (props) => {
  const { onClick, children, disabled } = props;
  return (
    <ButtonStyled onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
};
