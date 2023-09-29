import { User } from "firebase/auth";

export type TChatData = {
  message: string;
  user: string;
  avatar: string;
};

export type TRequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type TUser = {
  authUid: string;
  city: string;
  country: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  locale: string;
  picture: string;
  school: string;
};

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
