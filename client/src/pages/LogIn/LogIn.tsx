import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserAuth } from "context/AuthContext";
import { GoogleButton } from "components/GoogleButton";
import { LogInStyled } from "./LogIn.styles";

export const LogIn = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate("/account");
    }
  }, [user, navigate]);

  return (
    <LogInStyled>
      <div className="background-wrapper"></div>

      <div className="photos-wrapper">
        <img src="/images/log-in/books.png" alt="" />

        <img src="/images/log-in/owl.png" alt="" />
      </div>

      <div className="log-in-frame">
        <div>
          <div className="welcome">
            <span>Պատ</span>
            <span>րաստ</span>
            <span>վիր </span>
            <span>դպ</span>
            <span>րո</span>
            <span>ցին</span>
          </div>
          <GoogleButton />
        </div>
      </div>
    </LogInStyled>
  );
};
