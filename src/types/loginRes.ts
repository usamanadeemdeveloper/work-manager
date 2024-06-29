import { IUser } from "./user";

export interface LoginResponse {
    message: string;
    status: boolean;
    token: string;
    user: IUser;
}