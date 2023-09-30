import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "configs/firebaseConfig";
import { UserAuth } from "context/AuthContext";

export const useGetAlphabetLevel = () => {
  const { user } = UserAuth();
  const [level, setLevel] = useState<number>(1);

  const fetchALevel = async (authUid: string) => {
    const levelSnapshot = await getDoc(
      doc(fireDB, "GameUserLevels", `alphabet-${authUid}`)
    );
    const levelInfo = levelSnapshot.exists() ? levelSnapshot.data() : false;

    if (levelInfo) {
      setLevel(levelInfo.level);
    }
  };

  useEffect(() => {
    if (user?.authUid) {
      fetchALevel(user?.authUid);
    }
  }, [user?.authUid]);

  return level;
};
