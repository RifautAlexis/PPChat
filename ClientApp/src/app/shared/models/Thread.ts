import { IUser as User } from './User';
import { IMessage as Message } from './Message';

export interface IThread {
  id: string;
  speakers: Array<User>;
  messages: Array<Message>;
}
