export interface IUser {
    id?: string;
    pseudo: string;
    password: string;

    // Id from others users
    Friends?: number[];
}
