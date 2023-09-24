import { getAdditionalUserInfo, UserCredential } from "firebase/auth";
import { api } from "api";

export const createProfileIfNewUser = (userCredential: UserCredential) => {
  const userInfo = getAdditionalUserInfo(userCredential);

  if (userInfo) {
    const { isNewUser } = userInfo;

    if (isNewUser) {
      api.post("profiles", {
        profile: userInfo,
        uid: userCredential.user.uid,
      });
    }
  }
};
