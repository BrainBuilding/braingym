import { TUser } from "shared/types";

type Props = {
  user: TUser;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Avatar = (props: Props) => {
  return (
    <img
      onClick={props.onClick}
      referrerPolicy="no-referrer"
      className="avatar"
      title={`${props.user.first_name} ${props.user.last_name}`}
      src={props.user.picture}
      alt="Avatar"
    />
  );
};
