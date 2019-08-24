import { IMessage as Message } from '@shared/models/Message';

export interface INewThread {
  id: string;
  speakers: Array<string>;
  messages: Array<Message>;
}
