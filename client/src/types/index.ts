export type TChatData = {
  message: string;
  user: string;
  avatar: string;
};

export type TRequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type TNavItem = React.PropsWithChildren<{
  to: string;
}>;
