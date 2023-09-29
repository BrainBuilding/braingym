import { admin } from "../../../config/firebase.config";

class GameUserLevel {
  db = admin.firestore().collection("GameUserLevels");

  getId = ({ uid, gameName }: { uid: string; gameName: string }) => {
    return `${gameName}-${uid}`;
  };

  async getLevel(uid: string, gameName: string) {
    const snapshot = await this.db.doc(this.getId({ uid, gameName })).get();
    // .where("authUid", "==", uid)
    // .where("gameName", "==", gameName)
    // .get();

    console.log("snapshot[log]::", snapshot);

    if (!snapshot) {
      return 1;
    }

    return snapshot.data().level;
  }

  async levelUp(uid: string, gameName: string) {
    const currentLevelInfo = await this.getLevel(uid, gameName);

    return await this.db.doc(this.getId({ uid, gameName })).set(
      {
        level: currentLevelInfo.level + 1,
        ...currentLevelInfo,
      },
      { merge: true }
    );
  }
}

const GameUserLevelDB = new GameUserLevel();

export { GameUserLevelDB };
