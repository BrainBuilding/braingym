import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { TopsStyled } from "./Tops.styles";
import { fireDB } from "configs/firebaseConfig";
import { keyBy } from "lodash";
import { TUser } from "shared/types";
import { fetchPoints } from "./Tops.utils";
import { RankList } from "./RankList";
import { useTranslation } from "react-i18next";

export type TProfileWithPoints = TUser & {
  pointsAlphabet: number;
  pointsVowels: number;
};

export const Tops = () => {
  const [profiles, setProfiles] = useState<TProfileWithPoints[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pointsAlphabetData = await fetchPoints("PointsAlphabet");
        const pointsVowelsData = await fetchPoints("PointsVowels");

        const profilesQuery = query(collection(fireDB, "Profiles"));
        const profilesSnapshot = await getDocs(profilesQuery);
        const profilesData = profilesSnapshot.docs.map(
          (doc) => doc.data() as TUser
        );

        const pointsAlphabetMap = keyBy(pointsAlphabetData, "authUid");
        const pointsVowelsMap = keyBy(pointsVowelsData, "authUid");

        const profilesWithPoints = profilesData.map((profile) => {
          return {
            ...profile,
            pointsAlphabet: pointsAlphabetMap[profile.authUid]?.points || 0,
            pointsVowels: pointsVowelsMap[profile.authUid]?.points || 0,
          } as TProfileWithPoints;
        });

        setProfiles(profilesWithPoints);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <TopsStyled>
      <RankList
        profiles={profiles}
        gameName={t("navigation.alphabet")}
        gameKey="pointsAlphabet"
      />

      <RankList
        profiles={profiles}
        gameName={t("navigation.vowels")}
        gameKey="pointsVowels"
      />
    </TopsStyled>
  );
};
