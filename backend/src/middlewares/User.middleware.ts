import { Request, Response, NextFunction } from 'express';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import UserModel, { IUser } from '../models/User.model';
import {seed} from '../config/keys';

class UserMiddleware {
  public async verifyAdminRole(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user as IUser;
    const user=await UserModel.findById(id);

    if(!user) return res.json({statusText:'UserNotFound'});
    if(user.permissions != 'ADMIN_ROLE') return res.json({statusText:'UserNotAnAdmin'});
    next()
  }
}

//JWT authentication
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: String(seed)
};
export const jwt: Strategy = new Strategy(opts, async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.id);
    if(user) return done(null, user);
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});

export const userMiddleware = new UserMiddleware();