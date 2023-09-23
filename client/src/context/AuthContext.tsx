import { useContext, createContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "configs/firebaseConfig";
import { TUser } from "types";

type Props = {
  children: JSX.Element;
};

type TAuthContext = {
  isAuthCheckPending: boolean;
  logOut: () => Promise<void>;
  user: TUser | null;
};

const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isPending, setIsPending] = useState(true);

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsPending(false);
      setUser(currentUser as TUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ logOut, user, isAuthCheckPending: isPending }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
