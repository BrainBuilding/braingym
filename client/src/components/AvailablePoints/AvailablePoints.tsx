import { useEffect, useState } from "react";
import { collection, getDocs, where, query, limit } from "firebase/firestore";
import { fireDB } from "configs/firebaseConfig";
import { UserAuth } from "context/AuthContext";

export const AvailablePoints = () => {
  const { user } = UserAuth();
  const [points, setPoints] = useState<number>(0);

  const fetchAvailablePoints = async (authUid: string) => {
    const q = query(
      collection(fireDB, "AvailablePoints"),
      limit(1),
      where("authUid", "==", authUid)
    );

    await getDocs(q).then((querySnapshot) => {
      const pointsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      if (pointsData[0]?.points) {
        setPoints(pointsData[0]?.points);
      }
    });
  };

  useEffect(() => {
    if (user?.authUid) {
      fetchAvailablePoints(user?.authUid);
    }
  }, [user?.authUid]);

  return (
    <div>
      <div>Available Points: {points}</div>
    </div>
  );
};
