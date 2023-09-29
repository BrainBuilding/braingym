import { UserInfo } from "firebase-admin/auth";
import { Request, Response } from "express";
import { GameUserLevelDB } from "../../../models/games/GameUserLevel";

class Alphabet {
  getLevel = async function (
    req: Request<{}, any, any, any, Record<string, any>> & { user: UserInfo },
    res: Response<any, Record<string, any>>
  ) {
    GameUserLevelDB;
    const level = await GameUserLevelDB.getLevel(req.user.uid, "alphabet");

    res.send(JSON.stringify({ level: level }));
  };
}

const alphabet = new Alphabet();

export { alphabet };
