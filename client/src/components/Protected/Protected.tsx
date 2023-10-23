import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "context/AuthContext";
import { Loader } from "components/Loader";

type Props = React.FC<React.PropsWithChildren<unknown>>;

export const Protected: Props = (props) => {
  const { children } = props;
  const { user, isAuthCheckPending } = UserAuth();
  if (isAuthCheckPending || true) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/log-in" />;
  }

  return <>{children}</>;
};
