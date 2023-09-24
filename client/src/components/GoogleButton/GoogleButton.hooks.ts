import { signInWithPopup } from "firebase/auth";

import { auth, provider } from "configs/firebaseConfig";
import { useCallback } from "react";
import { createProfileIfNewUser } from "./GoogleButton.utils";

export const useSignInWithGoogle = () => {
  const googleSignIn = useCallback(async () => {
    return signInWithPopup(auth, provider)
      .then((user) => {
        createProfileIfNewUser(user);
      })
      .catch((error) => {
        console.log("error[log]::", error);
      });
  }, []);

  return googleSignIn;
};
