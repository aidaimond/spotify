import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import {HydratedDocument} from "mongoose";
import {IUser} from "../types";

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUser>
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as RequestWithUser;
  const token = req.get('Authorization');

  const user = token ? await User.findOne({token}) : next();

  user && token ? req.user = user : next();

  return next();
};

export default auth;