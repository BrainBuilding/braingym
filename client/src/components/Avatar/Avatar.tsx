import { TUser } from "types";

type Props = { user: TUser };

export const Avatar = (props: Props) => {
	return (
		<img className="avatar" title={props.user.displayName} src={props.user.photoURL} alt="Avatar" />
	)
}