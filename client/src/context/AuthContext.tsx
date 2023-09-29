import { useContext, createContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "configs/firebaseConfig";
import { TUser } from "types";
import { api } from "api";
import { localStore } from "utils";

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

  const logOut = () => {
    localStore.deleteData("token");
    localStore.deleteData("user");

    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        localStore.setData("token", "");
        localStore.setData("user", "");
        setIsPending(false);
      }

      currentUser?.getIdToken(true).then((tokenId) => {
        console.log("tokenId[log]::", tokenId);

        localStore.setData("token", tokenId);

        api.get<{ user: TUser }>("user-details").then((res) => {
          const { user } = res;
          localStore.setData("user", user);

          setUser(user);
          setIsPending(false);
        });
      });
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
