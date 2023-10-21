import { UserAuth } from "context/AuthContext";
import { EditableAvatar } from "components/EditableAvatar";

import { Language } from "./Language";
import { AccountStyled } from "./Account.styles";
import { AccountForm } from "./AccountForm";

export const Account = () => {
  const { user } = UserAuth();

  if (!user) {
    return null;
  }

  return (
    <AccountStyled>
      <div className="form-div">
        <p>
          {user.first_name} {user.last_name}
        </p>

        <EditableAvatar src={user.picture} />

        <Language />

        <AccountForm />
      </div>
    </AccountStyled>
  );
};
