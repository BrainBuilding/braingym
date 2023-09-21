import { UserAuth } from "context/AuthContext";

export const Account = () => {
  const { user } = UserAuth();

  return (
    <div className="w-[300px] m-auto">
      <h1 className="text-center text-2xl font-bold pt-12">Account</h1>
      <div>
        <p>Welcome, {user?.displayName}</p>

        {user?.photoURL && (
          <img alt="Profile" style={{width: 100, height: 100}} src={user?.photoURL} />
        )}
      </div>
    </div>
  );
};
