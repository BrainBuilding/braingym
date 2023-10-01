import { useEffect, useState } from "react";
import { Button } from "components/Button";
import { showEmoji } from "components/Emoji/Emoji";
import { AvailablePoints } from "components/AvailablePoints";
import { AlphabetBoard } from "components/AlphabetBoard";
import { usePlaySound } from "components/AlphabetBoard/AlphabetBoard.hooks";
import { letters } from "constants/alphabet/armenian";
import { SocketApi } from "socket";

import {
  TGameAlphabetChallenge,
  TSocketAnswer,
  TSocketRes,
} from "types/shared";
import { UserAuth } from "context/AuthContext";
import { TLetter } from "types";
import { useSelectLetters } from "./PlayAlphabet.hooks";

export const PlayAlphabet = () => {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [playGameSocketRes, setPlayGameSocketRes] = useState<
    TSocketRes<TGameAlphabetChallenge> | undefined
  >();

  const { user } = UserAuth();

  const { level, onChooseLetter, leftToSelectCount } = useSelectLetters(
    selectedLetters,
    setSelectedLetters
  );

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
    SocketApi.emit("play/alphabet", selectedLetters);
  };

  const challengeLetters =
    playGameSocketRes?.game?.data.challenge?.letters.map((letterKey) => {
      return letters.find((letter) => letter.key === letterKey) as TLetter;
    }) || [];

  return (
    <div>
      <h1>PlayAlphabet</h1>
      <AvailablePoints />
      <div>Level: {level}</div>

      <div>
        <AlphabetBoard
          size="small"
          onClick={onChooseLetter}
          selectedLetters={selectedLetters}
        />

        <div>
          <div>
            <div>Left to select {leftToSelectCount} letters.</div>

            <Button onClick={onPlay} disabled={!!leftToSelectCount}>
              Play
            </Button>
          </div>

          <div>
            {challengeLetters.length && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
