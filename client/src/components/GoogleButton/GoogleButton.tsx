import { useSignInWithGoogle } from "./GoogleButton.hooks";
import { GoogleButtonStyled } from "./GoogleButton.styles";

type Props = {
  disabled?: boolean;
};

export const GoogleButton: React.FC<Props> = (props) => {
  const { disabled } = props;
  const signInWithGoogle = useSignInWithGoogle();

  return (
    <GoogleButtonStyled
      onClick={signInWithGoogle}
      disabled={!!disabled}
      type="button"
      className="google-btn"
    >
      Sign in with Google
    </GoogleButtonStyled>
  );
};
