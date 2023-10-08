import { useContext, createContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "configs/firebaseConfig";
import { TUser } from "shared/types";
import { api } from "api";
import { localStore } from "utils";

type Props = {
  children: JSX.Element;
};

type TAuthContext = {
  isAuthCheckPending: boolean;
  logOut: () => Promise<void>;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

export const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isPending, setIsPending] = useState(true);

  const logOut = () => {
    setUser(null);

    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setIsPending(false);
      }

      currentUser?.getIdToken(true).then((tokenId) => {
        localStore.setData("token", tokenId);

        api.get<{ user: TUser }>("user-details").then((res) => {
          const { user } = res;

          setUser(user);
          setIsPending(false);
        });
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      localStore.deleteData("token");
      localStore.deleteData("user");
    } else {
      localStore.setData("user", user);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ logOut, user, isAuthCheckPending: isPending, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
