import { User } from "firebase/auth";

export type TChatData = {
  message: string;
  user: string;
  avatar: string;
};

export type TRequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type TUser = User & { photoURL: string, displayName: string };