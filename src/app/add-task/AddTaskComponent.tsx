"use client";
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import addtaskSvg from '../../../public/addTask.svg';
import { ObjectId } from "mongoose";
import { TaskStatus } from '@/enums/status';
import { addTask } from '@/services/taskService';
import { ITask } from '@/types/task';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

// Simplified task type for state management
type TaskState = {
  title: string;
  content: string;
  addedDate: Date;
  status: TaskStatus;
  userId: ObjectId;
};
const AddTaskComponent = () => {
  const [task, setTask] = useState<TaskState>({
    title: '',
    content: '',
    addedDate: new Date(),
    status: TaskStatus.Pending,
    userId: '' as unknown as ObjectId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const errorMsg = 'Failed to add task';
    try {
      const result = await addTask(task as ITask);
      if (result && !(result instanceof AxiosError)) {
        toast.success('Task added successfully');
        // now clean task
        task
      } else if (result instanceof AxiosError) {
        const axiosError = result as AxiosError<ErrorResponse>;
        const errorRes = axiosError.response?.data?.error || errorMsg;
        const message = axiosError.response?.data?.message || errorMsg;
        setError(errorMsg);
        console.error(errorRes);
        toast.error('Error adding task: ' + message);
      } else {
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err: any) {
      setError(errorMsg);
      toast.error('Unexpected error: ' + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='grid grid-cols-12 justify-center mt-3'>
      <div className='col-span-4 col-start-5 shadow-inner border-2 border-gray-600 p-6 rounded-xl'>
        <div className='flex justify-center'>
          <Image src={addtaskSvg} alt='loginSvg' width={250} priority />
        </div>
        <h1 className='text-3xl text-center mt-5'>Add Task</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Title</label>
            <input
              type='text'
              name='title'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Enter task title'
              required
              onChange={handleChange}
              value={task.title}
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='content' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Content</label>
            <textarea
              name='content'
              rows={4}
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Write your content here'
              onChange={handleChange}
              value={task.content}
            ></textarea>
          </div>
          <div className='mb-6'>
            <label htmlFor='status' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Status</label>
            <select
              name='status'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              onChange={handleChange}
              value={task.status}
            >
              <option value="" disabled>---Select Status---</option>
              <option value={TaskStatus.Pending}>Pending</option>
              <option value={TaskStatus.Completed}>Completed</option>
            </select>
          </div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Add Task'}
          </button>
          <button
            type='reset'
            className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-3'
            disabled={isSubmitting}
          >
            Clear
          </button>
          {error && <div className='mt-3 text-red-500'>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default AddTaskComponent;
