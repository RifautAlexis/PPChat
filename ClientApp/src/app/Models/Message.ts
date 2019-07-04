export interface IMessage {
    id: string;
    sender: string;     // id from sender
    recipient: string;  // id from recipier
    content: string;
    createdAt: Date;
    seeAt: Date;
}
