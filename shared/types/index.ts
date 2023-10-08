export type TSocketReq<T extends unknown> = {
  token: string;
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
