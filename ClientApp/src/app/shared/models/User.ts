export interface IUser {
    id?: string;
    email: string;
    username: string;

    // Id from others users
    contacts?: number[];
}
