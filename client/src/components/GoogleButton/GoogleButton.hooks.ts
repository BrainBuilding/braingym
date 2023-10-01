import { OAuthCredential, signInWithPopup } from "firebase/auth";

import { auth, provider } from "configs/firebaseConfig";
import { useCallback } from "react";
import { createProfileIfNewUser } from "./GoogleButton.utils";
import { localStore } from "../../utils";

export const useSignInWithGoogle = () => {
  const googleSignIn = useCallback(async () => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user as unknown as OAuthCredential;
        const token = user && user.accessToken;

        localStore.setData("token", token);

        createProfileIfNewUser(result);
      })
      .catch((error) => {
        console.error("error[log]::", error);
      });
  }, []);

  return googleSignIn;
};
