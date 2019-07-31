import { IUser as User } from '../Models/User';
import { IMessage as Message } from '../Models/Message';

export interface IThread {
  id: string;
  speakers: Array<User>;
  messages: Array<Message>;
}
