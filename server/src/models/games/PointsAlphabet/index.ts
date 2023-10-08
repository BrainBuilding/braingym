import { AvailablePoints } from "../AvailablePoints";

class PointsAlphabet extends AvailablePoints {
  POINTS_REQUIRED_TO_LEVEL_UP = 100;
}

const PointsAlphabetDB = new PointsAlphabet("PointsAlphabet");

export { PointsAlphabetDB };
