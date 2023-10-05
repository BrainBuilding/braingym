import { UserInfo } from "firebase-admin/auth";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { GameUserLevelDB } from "../../../models/games/GameUserLevel";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { getRandomItem, shuffle } from "../../../utils/array";
import {
  TSocketRes,
  TGameAlphabetChallenge,
  TSocketReq,
  TSocketAnswer,
} from "../../../types/shared";
import { PointsAlphabetDB } from "../../../models/games/PointsAlphabet";
import { EarnedPointsDB } from "../../../models/games/EarnedPoints";

class Alphabet {
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  gamesMap = new Map();

  getLevel = async function (
    req: Request<{}, any, any, any, Record<string, any>> & { user: UserInfo },
    res: Response<any, Record<string, any>>
  ) {
    GameUserLevelDB;
    const level = await GameUserLevelDB.getLevel(req.user.uid, "alphabet");

    res.send(JSON.stringify({ level: level }));
  };

  setSocket = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) => {
    this.socket = socket;
  };

  getAlphabetRes = (req: TSocketReq<string[]>) => {
    const selectedLetters = req.data;
    const shuffledLetters = shuffle(selectedLetters);
    const randomLetter = getRandomItem(selectedLetters);

    const gameId = uuidv4();
    const gameTime = 30;

    const gameData: TSocketRes<TGameAlphabetChallenge> = {
      off: false,
      game: {
        gameId,
        data: {
          challenge: {
            letters: shuffledLetters,
            letter: randomLetter,
          },
        },
        time: gameTime,
      },
    };

    return { gameData, answer: randomLetter };
  };

  socketOffIn = (
    socketActionPath: string,
    listener: (...args: any[]) => void,
    timeoutSeconds: number
  ) =>
    setTimeout(() => {
      this.socket.emit(socketActionPath, { off: true });
      this.socket.off(socketActionPath, listener);
      console.log(`Stopped listening to ${socketActionPath} due to timeout.`);
    }, timeoutSeconds * 1000);

  checkAnswer = (
    gameId: string,
    answerReq: TSocketAnswer<string>,
    correctAnswer: string,
    req: TSocketReq<string[]>
  ) => {
    const isAnswerCorrect = answerReq.answer === correctAnswer;

    if (isAnswerCorrect) {
      PointsAlphabetDB.increase(answerReq.authUid, 1);
    } else {
      PointsAlphabetDB.decrease(answerReq.authUid, 1);
    }

    EarnedPointsDB.addPoint(answerReq.authUid, {
      gameName: "alphabet",
      point: isAnswerCorrect ? 1 : -1,
      item: `answer: ${answerReq.answer}, correctAnswer: ${correctAnswer}`,
    });

    this.socket.emit(gameId, isAnswerCorrect);
    this.socket.off(gameId, this.gamesMap.get(gameId));

    this.startTheGame(req);
  };

  startTheGame = (req: TSocketReq<string[]>) => {
    const { gameData, answer } = this.getAlphabetRes(req);

    this.socket.emit("play/alphabet", gameData);

    this.gamesMap.set(
      gameData.game.gameId,
      (answerReq: TSocketReq<TSocketAnswer<string>>) => {
        this.checkAnswer(gameData.game.gameId, answerReq.data, answer, req);
      }
    );

    this.socket.on(
      gameData.game.gameId,
      this.gamesMap.get(gameData.game.gameId)
    );

    this.socketOffIn(
      gameData.game.gameId,
      this.gamesMap.get(gameData.game.gameId),
      gameData.game.time
    );
  };
}

const alphabet = new Alphabet();

export { alphabet };
