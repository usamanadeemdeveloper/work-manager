"use client";
import UserContext from '@/context/userContext';
import { getTasksOfUser } from '@/services/taskService';
import { ITask } from '@/types/task';
import { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';

const ShowTasksComponent = () => {
    const [tasks, setTasks] = useState<any[]>([]);

    async function getTasks(userId: string) {
        try {
            debugger
            const result = await getTasksOfUser(userId);
            if (!(result instanceof AxiosError)) {
                setTasks(result!);
            }
            console.log(tasks);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        debugger
        const userId: string | null = JSON.parse(localStorage.getItem('user')!).user._id;
        if (userId) {
            getTasks(userId);
        }
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Tasks</h2>
            {tasks.length > 0 ? (
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li key={task.id} className="p-4 bg-gray-100 rounded-md shadow-sm">
                            <h3 className="text-xl font-semibold">{task.title}</h3>
                            <p className="text-gray-700">{task.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center">No tasks available.</p>
            )}
        </div>
    );
};

export default ShowTasksComponent;
