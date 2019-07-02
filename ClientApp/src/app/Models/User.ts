export interface IUser {
    id?: string;
    username: string;
    // password: string;
    // token?: string;

    // Id from others users
    friends?: number[];
}
