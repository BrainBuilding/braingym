import { v4 as uuidv4 } from "uuid";
import { Socket } from "socket.io";
import shuffle from "lodash/shuffle";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import {
  getRandomElementsFromArray,
  getRandomItem,
} from "../../../utils/array";
import {
  TSocketRes,
  TGameAlphabetChallenge,
  TSocketReq,
  TSocketAnswer,
} from "../../../shared/types";
import { PointsAlphabetDB } from "../../../models/games/PointsAlphabet";
import { EarnedPointsDB } from "../../../models/games/EarnedPoints";
import { letters } from "../../../shared/constants/alphabet/armenian";

class Alphabet {
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  gamesMap = new Map();

  getLevel = async function (uid: string) {
    const pointsData = await PointsAlphabetDB.getAvailablePoints(uid);

    return Math.floor(
      pointsData.points / PointsAlphabetDB.POINTS_REQUIRED_TO_LEVEL_UP
    );
  };

  setSocket = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) => {
    this.socket = socket;
  };

  getAlphabetRes = async (req: TSocketReq<string[]>) => {
    const level = await this.getLevel(req.user.authUid);
    const randomLetters = getRandomElementsFromArray(letters, 3 + level, 3);

    const selectedLetters = randomLetters.map((letter) => letter.key);
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

  socketOffIn = (socketActionPath: string, timeoutSeconds: number) =>
    setTimeout(() => {
      this.socket.emit(socketActionPath, { off: true });
      this.socket.removeAllListeners(socketActionPath);
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
    this.socket.removeAllListeners(gameId);
    this.gamesMap.delete(gameId);

    this.startTheGame(req);
  };

  startTheGame = async (req: TSocketReq<string[]>) => {
    const { gameData, answer } = await this.getAlphabetRes(req);

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

    this.socketOffIn(gameData.game.gameId, gameData.game.time);
  };
}

const alphabet = new Alphabet();

export { alphabet };
