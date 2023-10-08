import { TUser } from "shared/types";

type Props = { user: TUser };

export const Avatar = (props: Props) => {
  return (
    <img
      referrerPolicy="no-referrer"
      className="avatar"
      title={`${props.user.first_name} ${props.user.last_name}`}
      src={props.user.picture}
      alt="Avatar"
    />
  );
};
