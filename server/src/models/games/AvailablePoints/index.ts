import { admin } from "../../../config/firebase.config";

class AvailablePoints {
  db: admin.firestore.CollectionReference<admin.firestore.DocumentData>;
  POINTS_REQUIRED_TO_LEVEL_UP = 200;

  constructor(collectionName: string) {
    this.db = admin.firestore().collection(collectionName);
  }

  getId = ({ uid }: { uid: string }) => {
    return uid;
  };

  async getAvailablePoints(uid: string) {
    const snapshot = await this.db.doc(this.getId({ uid })).get();

    if (!snapshot.exists) {
      return {
        authUid: uid,
        points: 0,
      };
    }

    return snapshot.data();
  }

  async increase(uid: string, by: number = 1) {
    const availablePoints = await this.getAvailablePoints(uid);

    return await this.db.doc(this.getId({ uid })).set(
      {
        ...availablePoints,
        points: availablePoints.points + by,
      },
      { merge: true }
    );
  }

  async decrease(uid: string, by: number = 1) {
    const availablePoints = await this.getAvailablePoints(uid);

    return await this.db.doc(this.getId({ uid })).set(
      {
        ...availablePoints,
        points:
          availablePoints.points - by > 0 ? availablePoints.points - by : 0,
      },
      { merge: true }
    );
  }
}

export { AvailablePoints };
