import { admin } from "../../../config/firebase.config";

export type TEarnedPoint = {
  authUid?: string;
  createdAt?: Date;
  gameName: string;
  item: string;
  point: number;
};

class EarnedPoints {
  db = admin.firestore().collection("EarnedPoints");

  async getEarnedPoints(uid: string) {
    const snapshot = await this.db.where("authUid", "==", uid).get();

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs.map((pointsDoc) => pointsDoc.data());
  }

  async addPoint(uid: string, point: TEarnedPoint) {
    const profileData = {
      authUid: uid,
      createdAt: new Date(),
      ["game-name"]: point.gameName,
      item: point.item,
      point: point.point,
    };

    console.log("Creating EarnedPoints authUid::", uid, point);

    return await this.db.add(profileData);
  }
}

const EarnedPointsDB = new EarnedPoints();

export { EarnedPointsDB };
