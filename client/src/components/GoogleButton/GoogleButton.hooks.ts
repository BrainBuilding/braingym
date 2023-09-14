import { signInWithPopup } from "firebase/auth";

import { auth, provider } from "configs/firebaseConfig";
import { useCallback } from "react";

export const useSignInWithGoogle = () => {
  const googleSignIn = useCallback(async () => {
    return signInWithPopup(auth, provider)
      .then((user) => {
        console.log("user[log]::", user);
      })
      .catch((error) => {
        console.log("error[log]::", error);
      });
  }, []);

  return googleSignIn;
};
