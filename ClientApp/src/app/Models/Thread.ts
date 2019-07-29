import { IUser as User } from '../Models/User';

export interface IThread {
  id: string;
  speakers: User[];
}
