import { connectDb } from "@/helper/db";
import { httpAxios } from "@/helper/httpHelper";
import { LoginResponse } from "@/types/loginRes";
import { IUser } from "@/types/user";
import { AxiosError, AxiosResponse } from "axios";
import { JwtPayload } from "jsonwebtoken";
connectDb();

export async function signUp(user: IUser): Promise<IUser | AxiosError | null> {
    try {
        const result: AxiosResponse<IUser> = await httpAxios
            .post("/api/user", user);
        return result.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error;
        }
        return null;
    }
}
export async function login(loginData: { email: string, password: string }): Promise<LoginResponse | AxiosError | null> {
    try {
        const result: AxiosResponse<LoginResponse> = await httpAxios
            .post("/api/login", loginData);
        return result.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error;
        }
        return null;
    }
}
export async function currentUser(): Promise<JwtPayload | AxiosError | null> {
    try {
        const result: AxiosResponse<JwtPayload> = await httpAxios.get("/api/current");
        return result.data; // Adjust the status based on your needs
    } catch (error) {
        if (error instanceof AxiosError) {
            return error;
        }
        return null;
    }
}
    export async function logout(): Promise<JwtPayload | AxiosError | null> {
        try {
            const result: AxiosResponse<JwtPayload> = await httpAxios
                .post("/api/logout");
            return result.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error;
            }
            return null;
        }
    }
