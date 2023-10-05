import { useEffect, useState } from "react";
import { onSnapshot, doc, Unsubscribe } from "firebase/firestore";
import { fireDB } from "configs/firebaseConfig";
import { UserAuth } from "context/AuthContext";

type TProps = {
  collectionName: string;
};

export const AvailablePoints: React.FC<TProps> = (props) => {
  const { collectionName } = props;
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
  }, [user?.authUid]);

  return (
    <div>
      <div>Points: {points}</div>
    </div>
  );
};
