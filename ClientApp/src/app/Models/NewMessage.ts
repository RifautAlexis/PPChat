import { IMessage as Message} from '../Models/Message';

export interface NewMessage {
  message: Message;
  threadId: string;
}
