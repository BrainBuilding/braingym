import { useEffect, useState } from "react";
import Star from "@mui/icons-material/Star";
import { onSnapshot, doc, Unsubscribe } from "firebase/firestore";
import { fireDB } from "configs/firebaseConfig";
import { UserAuth } from "context/AuthContext";
import { LevelAndPointsStyled } from "./LevelAndPoints.styles";
import { ProgressBar } from "../ProgressBar";
import { colors } from "../../styles";

type TProps = {
  collectionName: string;
  levelPoints: number;
};

export const LevelAndPoints: React.FC<TProps> = (props) => {
  const { collectionName, levelPoints } = props;
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

  return (
    <LevelAndPointsStyled className="level-and-points">
      <div className="label">Level</div>
      <div className="current-level">{level}</div>
      <ProgressBar value={currentPoints} ofValue={levelPoints} />
      <Star htmlColor={colors.yellow} />
    </LevelAndPointsStyled>
  );
};
