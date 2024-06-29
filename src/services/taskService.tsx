import { httpAxios } from "@/helper/httpHelper";
import { ITask } from "@/types/task";
import { AxiosError, AxiosResponse } from "axios";

export async function addTask(task: ITask): Promise<ITask | AxiosError | null> {
    try {
        const result: AxiosResponse<ITask> = await httpAxios.post("/api/task", task);
        return result.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error;
        }
        return null;
    }
}

export async function getTasksOfUser(userId: string): Promise<ITask[] | AxiosError | null> {
    try {
        const result: AxiosResponse<ITask[]> = await httpAxios.get(`/api/user/${userId}/task`);
        return result.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error;
        }
        return null;
    }
}