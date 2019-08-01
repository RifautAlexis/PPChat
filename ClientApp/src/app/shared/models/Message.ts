export interface IMessage {
  id: string;
  sender: string;     // id from sender
  thread: string;
  content: string;
  createdAt: Date;
  seeAt: Date;
}
