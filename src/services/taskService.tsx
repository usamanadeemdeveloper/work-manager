import { TaskStatus } from "@/enums/status";
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
export async function deleteTask(taskId: string): Promise<ITask | AxiosError | null> {
    try {
        const result: AxiosResponse<ITask> = await httpAxios.delete(`/api/task/${taskId}`);
        return result.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error;
        }
        return null;
    }
}

export async function completeTask(taskId: string, status: TaskStatus): Promise<ITask | AxiosError | null> {
    try {
        const result: AxiosResponse<ITask> = await httpAxios.patch(`/api/task/${taskId}`, { status });
        return result.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error;
        }
        return null;
    }
}

export async function getTaskById(taskId: string): Promise<ITask | AxiosError | null> {
    try {
        const result: AxiosResponse<ITask> = await httpAxios.get(`/api/task/${taskId}`);
        return result.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error;
        }
        return null;
    }
}