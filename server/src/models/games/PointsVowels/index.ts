import { AvailablePoints } from "../AvailablePoints";

class PointsVowels extends AvailablePoints {
  POINTS_REQUIRED_TO_LEVEL_UP = 50;
}

const PointsVowelsDB = new PointsVowels("PointsVowels");

export { PointsVowelsDB };
