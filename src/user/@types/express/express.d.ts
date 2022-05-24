import { IUser } from '../../../user/service/user.interface';
import { Request } from 'express';
declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
