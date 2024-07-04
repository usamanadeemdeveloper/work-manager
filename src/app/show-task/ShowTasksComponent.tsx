"use client";
import UserContext from '@/context/userContext';
import { TaskStatus } from '@/enums/status';
import { completeTask, deleteTask, getTasksOfUser } from '@/services/taskService';
import { ITask } from '@/types/task';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ShowTasksComponent = () => {
    const [tasks, setTasks] = useState<ITask[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<TaskStatus | 'all'>('all');
    const context = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (context?.user?._id) {
            getTasks(context.user._id);
        }
    }, [context]);

    async function getTasks(userId: string) {
        setLoading(true);
        try {
            const result = await getTasksOfUser(userId);
            if (!(result instanceof AxiosError)) {
                setTasks(result);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (taskId: string): Promise<void> => {
        setLoading(true);
        try {
            const result = await deleteTask(taskId);
            if (result && !(result instanceof AxiosError)) {
                toast.success('Task deleted successfully');
                getTasks(context?.user?._id);
            } else if (result instanceof AxiosError) {
                const axiosError = result as AxiosError<ErrorResponse>;
                const message = axiosError.response?.data?.message;
                toast.error('Error deleting task: ' + message);
            }
        } catch (err: any) {
            toast.error('Unexpected error: ' + err);
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async (taskId: string, status: TaskStatus): Promise<void> => {
        setLoading(true);
        // Testing
        try {
            const result = await completeTask(taskId, status);
            if (result && !(result instanceof AxiosError)) {
                toast.success('Task marked as completed successfully');
                getTasks(context?.user?._id);
            } else if (result instanceof AxiosError) {
                const axiosError = result as AxiosError<ErrorResponse>;
                const message = axiosError.response?.data?.message;
                toast.error('Error marking task as completed: ' + message);
            }
        } catch (err: any) {
            toast.error('Unexpected error: ' + err);
        } finally {
            setLoading(false);
        }
    };

    const filteredTasks = tasks?.filter(task => filter === 'all' || task.status === filter);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Your Tasks</h2>
            <div className="flex justify-center mb-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as TaskStatus | 'all')}
                    className="p-2 bg-gray-700 text-white rounded-md"
                >
                    <option value="all">All</option>
                    <option value={TaskStatus.Completed}>Completed</option>
                    <option value={TaskStatus.Pending}>Pending</option>
                </select>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : filteredTasks!.length > 0 ? (
                <ul className="space-y-4">
                    {filteredTasks!.map((task: ITask) => (
                        <li key={task._id as string} className="p-4 bg-gray-700 rounded-md shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-semibold text-blue-400">{task.title}</h3>
                                <p className="text-gray-300">{task.content}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Status: <span className={`font-medium ${task.status === TaskStatus.Completed ? 'text-green-400' : 'text-red-400'}`}>{task.status}</span>
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-blue-500 hover:text-blue-600" onClick={() => handleComplete(task._id as string, TaskStatus.Completed)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                                <button className="text-red-500 hover:text-red-600" onClick={() => handleDelete(task._id as string)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                </button>
                                {/* <button className="text-green-500 hover:text-green-600" onClick={() => router.push(`/add-task/${task._id}`)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button> */}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400 text-center">No tasks available.</p>
            )}
        </div>
    );
};

export default ShowTasksComponent;
