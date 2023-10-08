import { useEffect, useState } from "react";
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

  const playSound = usePlaySound();

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

  return (
    <PlayAlphabetStyled>
      <h1>PlayAlphabet</h1>
      <LevelAndPoints levelPoints={100} collectionName="PointsAlphabet" />

      <div>
        <AlphabetBoard size="small" selectedLetters={selectedLetters} />

        <div>
          <div className="button-wrapper">
            <Button onClick={onPlay}>Play</Button>
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
                  onClick={(letterKey) => () => {
                    if (playGameSocketRes?.game?.gameId) {
                      SocketApi.emit(playGameSocketRes?.game?.gameId, {
                        authUid: user?.authUid,
                        answer: letterKey,
                      } as TSocketAnswer<string>);

                      SocketApi.on(
                        playGameSocketRes?.game?.gameId,
                        (isCorrect: boolean) => {
                          showEmoji(isCorrect ? "😍" : "😔");
                        }
                      );
                    }
                  }}
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
