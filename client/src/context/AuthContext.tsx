import { useContext, createContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "configs/firebaseConfig";

type Props = {
  children: JSX.Element;
};
type TAuthContext = {
  isAuthCheckPending: boolean;
  logOut: () => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(true);

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsPending(false);
      setUser(currentUser);
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
