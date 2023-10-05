import { admin } from "../../config/firebase.config";

class DBHelper {
  db = admin.firestore();

  async rename(oldName: string, newName: string) {
    const db = admin.firestore();
    const oldCollRef = db.collection(oldName);
    const oldCollSnap = await oldCollRef.get();

    let arrayPromise = [];
    oldCollSnap.forEach(async (doc) => {
      arrayPromise.push(
        new Promise(async (resolve, reject) => {
          resolve(await db.collection(newName).add(doc.data()));
        })
      );
    });

    return Promise.all(arrayPromise);
  }
}

const dbHelper = new DBHelper();

export { dbHelper };
