import { ProgressBarStyled } from "./ProgressBar.styles";

type TProps = {
  value: number;
  ofValue: number;
};

export const ProgressBar: React.FC<TProps> = (props) => {
  const { value, ofValue } = props;
  const percentage = Math.floor((value / ofValue) * 100);

  return (
    <ProgressBarStyled percentage={percentage}>
      <div className="progress-bar-fill">{percentage}%</div>
    </ProgressBarStyled>
  );
};
