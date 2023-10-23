import { useEffect, useState } from "react";
import { isBoolean } from "lodash";
import { useTranslation } from "react-i18next";
import { SocketApi } from "socket";
import { lettersMap } from "shared/constants/alphabet/armenian";
import { LevelAndPoints } from "components/LevelAndPoints";
import { AlphabetBoard } from "components/AlphabetBoard";
import { Button } from "components/Button";
import { usePlaySound } from "components/AlphabetBoard/AlphabetBoard.hooks";
import { TGameVowelsChallenge, TSocketAnswer, TSocketRes } from "shared/types";
import { UserAuth } from "context/AuthContext";
import { showEmoji } from "components/Emoji/Emoji";
import { Timer } from "components/Timer/Timer";
import { useVowels } from "./Vowels.hooks";
import { VowelsStyled } from "./Vowels.styles";

export const Vowels = () => {
  const [playGameSocketRes, setPlayGameSocketRes] = useState<
    TSocketRes<TGameVowelsChallenge> | undefined
  >();

  const { user } = UserAuth();
  const { t } = useTranslation();
  const playSound = usePlaySound();
  const vowels = useVowels();

  useEffect(() => {
    const playGameListener = (socketRes: TSocketRes<TGameVowelsChallenge>) => {
      if (socketRes.game) {
        setPlayGameSocketRes(socketRes);
      }
    };

    const playGameRef = SocketApi.on("play/vowels", playGameListener);

    return () => {
      console.log("Off playVowelsRef Socket!!!");

      playGameRef.off();
    };
  }, []);

  useEffect(() => {
    if (playGameSocketRes?.game?.data.challenge) {
      playSound(playGameSocketRes?.game?.data.challenge.letter)();
    }
  }, [playGameSocketRes?.game?.data.challenge, playSound]);

  const onPlay = () => {
    SocketApi.emit("play/vowels");
  };

  const onAnswer = (isVowel: boolean) => () => {
    if (playGameSocketRes?.game?.gameId) {
      SocketApi.emit(playGameSocketRes?.game?.gameId, {
        authUid: user?.authUid,
        answer: isVowel,
      } as TSocketAnswer<boolean>);

      SocketApi.on(playGameSocketRes?.game?.gameId, (isCorrect: boolean) => {
        if (isBoolean(isCorrect)) {
          showEmoji(isCorrect ? "😍" : "😔");
        }

        SocketApi.removeAllListeners(playGameSocketRes?.game?.gameId!);
      });
    }
  };

  const challengeLetter =
    lettersMap[playGameSocketRes?.game?.data.challenge.letter as string];

  return (
    <VowelsStyled>
      <LevelAndPoints levelPoints={50} collectionName="PointsVowels" />

      <div>
        <AlphabetBoard
          onClick={playSound}
          size="small"
          selectedLetters={vowels}
        />

        <div className="button-wrapper">
          <Button onClick={onPlay}>{t("button.play")}</Button>
        </div>

        {playGameSocketRes?.game?.gameId ? (
          <>
            <Timer
              key={playGameSocketRes?.game?.gameId}
              time={playGameSocketRes?.game?.time as number}
              onTimeOff={setPlayGameSocketRes}
            />
            <div className="buttons-wrapper">
              <Button
                hoverColor="main"
                color="secondary"
                onClick={onAnswer(true)}
              >
                {t("vowel")}
              </Button>

              <div
                className="challenge-letter-wrapper"
                onClick={() => playSound(challengeLetter.key)()}
              >
                <div className="challenge-letter">
                  {
                    lettersMap[playGameSocketRes?.game?.data.challenge.letter]
                      .value.uppercase
                  }{" "}
                  {
                    lettersMap[playGameSocketRes?.game?.data.challenge.letter]
                      .value.uppercase
                  }
                </div>
              </div>

              <Button
                color="rose"
                hoverColor="roseDark"
                onClick={onAnswer(false)}
              >
                {t("consonant")}
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </VowelsStyled>
  );
};
