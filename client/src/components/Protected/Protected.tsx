import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "context/AuthContext";

type Props = React.FC<React.PropsWithChildren<unknown>>;

export const Protected: Props = (props) => {
  const { children } = props;
  const { user, isAuthCheckPending } = UserAuth();
  if (isAuthCheckPending) {
    return <div>Loading . . .</div>;
  }

  if (!user) {
    return <Navigate to="/log-in" />;
  }

  return <>{children}</>;
};
