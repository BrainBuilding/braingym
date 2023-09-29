import { UserAuth } from "context/AuthContext";

export const Account = () => {
  const { user } = UserAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="w-[300px] m-auto">
      <h1 className="text-center text-2xl font-bold pt-12">Account</h1>
      <div>
        <p>
          Welcome, {user.first_name} {user.last_name}
        </p>

        <img
          referrerPolicy="no-referrer"
          alt="Profile"
          style={{ width: 100, height: 100 }}
          src={user.picture}
        />
      </div>
    </div>
  );
};
