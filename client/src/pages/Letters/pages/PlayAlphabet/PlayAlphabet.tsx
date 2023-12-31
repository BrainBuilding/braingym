import { useEffect, useState } from "react";
import { isBoolean } from "lodash";
import { useTranslation } from "react-i18next";
import { SocketApi } from "socket";
import { letters } from "shared/constants/alphabet/armenian";
import { Button } from "components/Button";
import { showEmoji } from "components/Emoji/Emoji";
import { LevelAndPoints } from "components/LevelAndPoints";
import { AlphabetBoard } from "components/AlphabetBoard";
import { usePlaySound } from "components/AlphabetBoard/AlphabetBoard.hooks";

import {
  TGameAlphabetChallenge,
  TSocketAnswer,
  TSocketRes,
} from "shared/types";
import { UserAuth } from "context/AuthContext";
import { TLetter } from "shared/types";
import { useActiveLetters } from "./PlayAlphabet.hooks";
import { PlayAlphabetStyled } from "./PlayAlphabet.styles";
import { Timer } from "../../../../components/Timer/Timer";

export const PlayAlphabet = () => {
  const [playGameSocketRes, setPlayGameSocketRes] = useState<
    TSocketRes<TGameAlphabetChallenge> | undefined
  >();

  const { user } = UserAuth();
  const { t } = useTranslation();
  const playSound = usePlaySound();

  useEffect(() => {
    const playAlphabetListener = (
      socketRes: TSocketRes<TGameAlphabetChallenge>
    ) => {
      if (socketRes.game) {
        setPlayGameSocketRes(socketRes);
      }
    };

    const playAlphabetRef = SocketApi.on("play/alphabet", playAlphabetListener);

    return () => {
      console.log("Off playAlphabetRef Socket!!!");

      playAlphabetRef.off();
    };
  }, []);

  useEffect(() => {
    if (playGameSocketRes?.game?.data.challenge) {
      playSound(playGameSocketRes?.game?.data.challenge.letter)();
    }
  }, [playGameSocketRes?.game?.data.challenge, playSound]);

  const onPlay = () => {
    SocketApi.emit("play/alphabet");
  };

  const challengeLetters =
    playGameSocketRes?.game?.data.challenge?.letters.map((letterKey) => {
      return letters.find((letter) => letter.key === letterKey) as TLetter;
    }) || [];

  const selectedLetters = useActiveLetters();

  const onAnswer = (letterKey: string) => () => {
    if (playGameSocketRes?.game?.gameId) {
      SocketApi.emit(playGameSocketRes?.game?.gameId, {
        authUid: user?.authUid,
        answer: letterKey,
      } as TSocketAnswer<string>);

      SocketApi.on(playGameSocketRes?.game?.gameId, (isCorrect: boolean) => {
        if (isBoolean(isCorrect)) {
          showEmoji(isCorrect ? "😍" : "😔");
        }

        SocketApi.removeAllListeners(playGameSocketRes?.game?.gameId!);
      });
    }
  };

  return (
    <PlayAlphabetStyled>
      <LevelAndPoints levelPoints={100} collectionName="PointsAlphabet" />

      <div>
        <AlphabetBoard
          onClick={playSound}
          size="small"
          selectedLetters={selectedLetters}
        />

        <div>
          <div className="button-wrapper">
            <Button onClick={onPlay}>{t("button.play")}</Button>
          </div>

          <div>
            {playGameSocketRes?.game?.gameId ? (
              <>
                <Timer
                  key={playGameSocketRes?.game?.gameId}
                  time={playGameSocketRes?.game?.time as number}
                  onTimeOff={setPlayGameSocketRes}
                />
                <AlphabetBoard
                  size="small"
                  onClick={onAnswer}
                  letters={challengeLetters}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </PlayAlphabetStyled>
  );
};
