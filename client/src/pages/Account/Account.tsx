import { UserAuth } from "context/AuthContext";
import { Language } from "./Language";
import { AccountStyled } from "./Account.styles";


export const Account = () => {
  const { user } = UserAuth();

  if (!user) {
    return null;
  }

  return (
    <AccountStyled>
      <div className="form-div">
        <h1 className="text-center text-2xl font-bold pt-12">Account</h1>
        <p>{user.first_name} {user.last_name}</p>
        <img
          referrerPolicy="no-referrer"
          alt="Profile"
          style={{ width: 100, height: 100 }}
          src={user.picture}
        />
        <div>
          <Language />
        </div>
        <button className="avatar-button" >Change Avatar</button>
        <div className="inputs">
          <input type="text" placeholder="Firs Name" />
          <input type="text" placeholder="Last Name" />
          <input type="number" placeholder="Age" min={0} />
          <input type="text" placeholder="Your School" />
          <input type="text" placeholder="Your City" />
          <input type="email" placeholder="Email" />
        </div>
      </div>
    </AccountStyled>
  );
};
