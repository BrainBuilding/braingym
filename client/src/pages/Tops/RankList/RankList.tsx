import { orderBy } from "lodash";
import { TProfileWithPoints } from "../Tops";
import { RankListStyled } from "./RankList.styles";

type TProps = {
  profiles: TProfileWithPoints[];
  gameName: string;
  gameKey: "pointsAlphabet" | "pointsVowels";
};

export const RankList: React.FC<TProps> = (props) => {
  const { profiles, gameName, gameKey } = props;

  const sortedProfiles = orderBy(profiles, gameKey, "desc");
  console.log("profiles[log]::", profiles);

  return (
    <RankListStyled>
      <div className="game-name">{gameName}</div>

      <div className="rank-list">
        {sortedProfiles.map((profile, index) => (
          <div className="list-item" key={profile.authUid}>
            <div className="rank-position">{index + 1}</div>

            <div className="profile-name">
              {profile.first_name} {profile.last_name}
            </div>

            <div className="points">{profile[gameKey]}</div>
          </div>
        ))}
      </div>
    </RankListStyled>
  );
};
