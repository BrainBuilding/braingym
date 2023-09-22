import { User } from "firebase/auth";

export type TChatData = {
  message: string;
  user: string;
  avatar: string;
};

export type TRequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type TUser = User & { photoURL: string; displayName: string };

export type TLetter = {
  key: string;
  value: {
    uppercase: string;
    lowercase: string;
  };
};

export type TNavItem = React.PropsWithChildren<{
  to: string;
}>;
