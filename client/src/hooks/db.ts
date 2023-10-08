import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { fireDB } from "../configs/firebaseConfig";

type TArgs = {
  collectionName: string;
  levelPoints: number;
};

export const useGetLevelAndPoints = (args: TArgs) => {
  const { collectionName, levelPoints } = args;
  const { user } = UserAuth();
  const [points, setPoints] = useState<number>(0);

  const fetchAvailablePoints = async (authUid: string) => {
    const docRef = doc(fireDB, collectionName, authUid);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const pointsData = docSnap.data();
        setPoints(pointsData?.points);
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    let unsubscribePromise: Promise<Unsubscribe> | null = null;

    if (user?.authUid) {
      unsubscribePromise = fetchAvailablePoints(user.authUid);
    }

    return () => {
      if (unsubscribePromise) {
        unsubscribePromise.then((unsubscribe) => {
          unsubscribe();
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.authUid]);

  const level = Math.floor(points / levelPoints);
  const currentPoints = points - level * levelPoints;

  return {
    level,
    currentPoints,
    totalPoints: points,
  };
};
