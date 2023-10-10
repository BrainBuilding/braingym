import { UserAuth } from "context/AuthContext";
import { Language } from "./Language";

export const Account = () => {
  const { user } = UserAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="w-[300px] m-auto">
      <div>
        <p>
          {user.first_name} {user.last_name}
        </p>

        <img
          referrerPolicy="no-referrer"
          alt="Profile"
          style={{ width: 100, height: 100 }}
          src={user.picture}
        />
      </div>

      <div>
        <Language />
      </div>
    </div>
  );
};
