export interface IUser {
    id?: string;
    username: string;

    // Id from others users
    friends?: number[];
}
