export interface IThread {
    id?: string;
    speakers: string[];     // id from sender
    messages: string[];     // id from recipier
    createdAt: Date;
}
