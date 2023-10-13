import { collection, getDocs, query } from "firebase/firestore";
import { fireDB } from "configs/firebaseConfig";
import { TPoints } from "shared/types";

export const fetchPoints = async (collectionName: string) => {
  const pointsQuery = query(collection(fireDB, collectionName));
  const pointsSnapshot = await getDocs(pointsQuery);
  const pointsData = pointsSnapshot.docs.map((doc) => doc.data() as TPoints);

  return pointsData;
};
