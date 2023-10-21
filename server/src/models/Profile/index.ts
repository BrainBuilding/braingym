import { admin } from "../../config/firebase.config";
import { TUser } from "../../shared/types";

class Profile {
  db = admin.firestore().collection("Profiles");

  async getProfile(uid) {
    const snapshot = await this.db.where("authUid", "==", uid).get();

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data();
  }

  async addProfile(uid, profile) {
    const profileData = {
      id: profile.id,
      first_name: profile.given_name,
      last_name: profile.family_name,
      email: profile.email,
      picture: profile.picture,
      locale: profile.locale,
      authUid: uid,
      country: "",
      city: "",
      school: "",
    };

    return await this.db.add(profileData);
  }

  async addProfileIfNotExist(uid, profile) {
    const profileRes = await this.getProfile(uid);

    if (!profileRes) {
      await this.addProfile(uid, profile);
      return await this.getProfile(uid);
    } else {
      return profileRes;
    }
  }

  async updateProfile(uid: string, profile: TUser) {
    const profileRes = await this.getProfile(uid);

    const querySnapshot = await this.db.where("authUid", "==", uid).get();

    for (const profileDoc of querySnapshot.docs) {
      const profileRef = this.db.doc(profileDoc.id);

      const mergedData = {
        ...profileRes,
        ...profile,
      };

      const profileData = {
        ...mergedData,
        age: +profile.age,
      };

      await profileRef.update(profileData);
    }

    return await this.getProfile(uid);
  }
}

const ProfileDB = new Profile();

export { ProfileDB };
