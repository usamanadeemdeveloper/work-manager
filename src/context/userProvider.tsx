"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { currentUser } from '@/services/userService';
import { JwtPayload } from 'jsonwebtoken';
import { AxiosError } from 'axios';
import UserContext from './userContext';

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<JwtPayload | null>(null);

    useEffect(() => {
        async function fetchCurrentUser() {
            try {
                const loginUser = await currentUser();
                if (loginUser && !(loginUser instanceof AxiosError)) {
                    setUser(loginUser.user);
                    console.log("Login user: ", loginUser.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                toast.error('Error: ' + error);
                setUser(null);
            }
        }
        fetchCurrentUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
