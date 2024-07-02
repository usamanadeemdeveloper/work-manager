"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useLoginHelper } from '@/helper/loginHelper';

const Login = () => {
    const loginHelper = useLoginHelper(true);
    const [user, setUser] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Load saved credentials from local storage
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail && savedPassword) {
            setUser({ email: savedEmail, password: savedPassword });
        }
        // Validate form
        const validateForm = () => {
            const { email, password } = user;
            setIsFormValid(email.trim() !== '' && password.trim() !== '');
        };
        validateForm();
    }, [user]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await loginHelper(user);
        } catch (err) {
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-12 justify-center mt-3">
            <div className="col-span-4 col-start-5 shadow-inner border-2 border-gray-600 p-6 rounded-xl">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <div className="mt-3 text-red-500">{error}</div>}
                        <button
                            type="submit"
                            className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={!isFormValid || isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Sign in'}
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet?{' '}
                            <Link href={'/signup'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
