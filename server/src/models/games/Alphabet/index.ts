import { admin } from "../../../config/firebase.config";

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

    console.log("Creating profile  authUid::", uid);

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
}

const ProfileDB = new Profile();

export { ProfileDB };
