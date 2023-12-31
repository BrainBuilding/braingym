export type TUser = {
  authUid: string;
  city: string;
  country: string;
  email: string;
  first_name: string;
  age?: number;
  id: string;
  last_name: string;
  locale: string;
  picture: string;
  school: string;
};

export type TPoints = {
  authUid: string;
  points: number;
};

export type TSocketReq<T extends unknown> = {
  token: string;
  user: TUser;
  data: T;
};

export type TSocketAnswer<T> = {
  authUid: string;
  answer: T;
};

export type TSocketRes<T extends any> = {
  off?: boolean;
  game?: {
    gameId: string;
    data: {
      challenge: T;
    };
    time: number;
  };
};

export type TGameAlphabetChallenge = {
  letters: string[];
  letter: string;
};

export type TGameVowelsChallenge = {
  letter: string;
};

export type TLetter = {
  key: string;
  value: {
    uppercase: string;
    lowercase: string;
  };
  isVowel: boolean;
  hasOneSound: boolean;
};
