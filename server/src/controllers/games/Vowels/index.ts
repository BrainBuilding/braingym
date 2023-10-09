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
  TGameVowelsChallenge,
  TSocketReq,
  TSocketAnswer,
} from "../../../shared/types";
import { PointsVowelsDB } from "../../../models/games/PointsVowels";
import { EarnedPointsDB } from "../../../models/games/EarnedPoints";
import { letters } from "../../../shared/constants/alphabet/armenian";

class Vowels {
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  gamesMap = new Map();

  getLevel = async function (uid: string) {
    const pointsData = await PointsVowelsDB.getAvailablePoints(uid);

    return Math.floor(
      pointsData.points / PointsVowelsDB.POINTS_REQUIRED_TO_LEVEL_UP
    );
  };

  setSocket = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) => {
    this.socket = socket;
  };

  getGameRes = async (req: TSocketReq<undefined>) => {
    const lettersWithOneSound = letters.filter((letter) => letter.hasOneSound);
    const randomLetter = getRandomItem(lettersWithOneSound);

    const gameId = uuidv4();
    const gameTime = 30;

    const gameData: TSocketRes<TGameVowelsChallenge> = {
      off: false,
      game: {
        gameId,
        data: {
          challenge: {
            letter: randomLetter.key,
          },
        },
        time: gameTime,
      },
    };

    return { gameData, answer: randomLetter.isVowel };
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
    answerReq: TSocketAnswer<boolean>,
    correctAnswer: boolean,
    req: TSocketReq<undefined>
  ) => {
    const isAnswerCorrect = answerReq.answer === correctAnswer;

    if (isAnswerCorrect) {
      PointsVowelsDB.increase(answerReq.authUid, 1);
    } else {
      PointsVowelsDB.decrease(answerReq.authUid, 6);
    }

    EarnedPointsDB.addPoint(answerReq.authUid, {
      gameName: "vowels",
      point: isAnswerCorrect ? 1 : -6,
      item: `answer: ${answerReq.answer ? "true" : "false"}, correctAnswer: ${
        correctAnswer ? "true" : "false"
      }`,
    });

    this.socket.emit(gameId, isAnswerCorrect);
    this.socket.off(gameId, this.gamesMap.get(gameId));

    this.startTheGame(req);
  };

  startTheGame = async (req: TSocketReq<undefined>) => {
    const { gameData, answer } = await this.getGameRes(req);

    this.socket.emit("play/vowels", gameData);

    this.gamesMap.set(
      gameData.game.gameId,
      (answerReq: TSocketReq<TSocketAnswer<boolean>>) => {
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

const vowels = new Vowels();

export { vowels };
