import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserAuth } from "context/AuthContext";
import { GoogleButton } from "components/GoogleButton";

export const LogIn = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate("/account");
    }
  }, [user]);

  console.log("user2[log]::", user);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold py-8">Sign in</h1>
      <div className="max-w-[240px] m-auto py-4">
        <GoogleButton />
      </div>
    </div>
  );
};
