"use client";
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import signUpSvg from '../../../public/signUp.svg';
import { IUser } from '@/types/user';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { signUp } from '@/services/userService';
import Link from 'next/link';
import { useLoginHelper } from '@/helper/loginHelper';

// Simplified task type for state management
type UserState = {
    name: string;
    email: string;
    password: string;
    about?: string;
    profilePicUrl?: string;
};
const SignUpPage = () => {
    const [user, setUser] = useState<UserState>({
        name: '',
        email: '',
        password: '',
        about: '',
        profilePicUrl: '',
    });

    const loginHelper = useLoginHelper();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        const errorMsg = 'Failed to Register';

        try {
            const result = await signUp(user as IUser);

            if (result && !(result instanceof AxiosError)) {
                // Successful registration
                toast.success(`Registered Successfully. Welcome ${result.name}`);
                // Clear form fields after successful registration
                setUser({
                    name: '',
                    email: '',
                    password: '',
                    about: '',
                    profilePicUrl: '',
                });
                loginHelper(user)
            } else if (result instanceof AxiosError) {
                // Error occurred during registration
                const axiosError = result as AxiosError<ErrorResponse>;
                const errorRes = axiosError.response?.data?.error || errorMsg;
                const message = axiosError.response?.data?.message || errorMsg;

                setError(errorMsg); // Set general error message
                debugger
                if (axiosError.response?.status === 409) {
                    // Handle specific error cases (e.g., duplicate email)
                    toast.error('This email is already registered.');
                } else {
                    toast.error('Error registering user: ' + message);
                }
            } else {
                // Handle unexpected result (should not happen under normal circumstances)
                setError(errorMsg);
                toast.error(errorMsg);
            }
        } catch (err: any) {
            // Handle unexpected errors (e.g., network issues)
            setError(errorMsg);
            toast.error('Unexpected error: ' + err.message);
        } finally {
            setIsSubmitting(false); // Ensure submission flag is reset regardless of outcome
        }
    };

    return (
        <div>
            <div className="grid grid-cols-12 justify-center mt-3">
                <div className="col-span-4 col-start-5 shadow-inner border-2 border-gray-600 p-6 rounded-xl">
                    <div className='flex justify-center'>
                        <Image width={200} className='pt-5' priority src={signUpSvg} alt="logo" />
                    </div>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                <input
                                    type="name"
                                    name="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name"
                                    required
                                    value={user.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={user.password}
                                    onChange={handleChange}
                                    required />
                            </div>
                            {error && <div className='mt-3 text-red-500'>{error}</div>}
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Create an account'}
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link href={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;
