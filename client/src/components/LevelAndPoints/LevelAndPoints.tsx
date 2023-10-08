import Star from "@mui/icons-material/Star";
import { LevelAndPointsStyled } from "./LevelAndPoints.styles";
import { ProgressBar } from "../ProgressBar";
import { colors } from "../../styles";
import { useGetLevelAndPoints } from "hooks/db";

type TProps = {
  collectionName: string;
  levelPoints: number;
};

export const LevelAndPoints: React.FC<TProps> = (props) => {
  const { collectionName, levelPoints } = props;

  const { level, currentPoints } = useGetLevelAndPoints({
    collectionName,
    levelPoints,
  });

  return (
    <LevelAndPointsStyled className="level-and-points">
      <div className="label">Level</div>
      <div className="current-level">{level}</div>
      <ProgressBar value={currentPoints} ofValue={levelPoints} />
      <Star htmlColor={colors.yellow} />
    </LevelAndPointsStyled>
  );
};