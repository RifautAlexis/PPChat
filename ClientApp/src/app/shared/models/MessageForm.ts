export interface IMessageForm {
  sender: string;     // id from sender
  thread: string;
  content: string;
  createdAt: Date;
  seeAt: Date;
}
