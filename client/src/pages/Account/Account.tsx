import { UserAuth } from "context/AuthContext";
import { useEffect } from "react";
import { api } from "api";

export const Account = () => {
  const { user } = UserAuth();

  useEffect(() => {
    api.get("user-details/5").then((res) => {
      console.log("res[log]::", res);
    });
  }, []);

  return (
    <div className="w-[300px] m-auto">
      <h1 className="text-center text-2xl font-bold pt-12">Account</h1>
      <div>
        <p>Welcome, {user?.displayName}</p>

        {user?.photoURL && (
          <img
            referrerPolicy="no-referrer"
            alt="Profile"
            style={{ width: 100, height: 100 }}
            src={user?.photoURL}
          />
        )}
      </div>
    </div>
  );
};
