"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { currentUser } from '@/services/userService';
import UserContext from './userContext';
import { JwtPayload } from 'jsonwebtoken';
import { AxiosError } from 'axios';

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<JwtPayload | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        async function fetchCurrentUser() {
            try {
                const loginUser = await currentUser();
                if (!(loginUser instanceof AxiosError)) {
                    setUser(loginUser);
                    localStorage.setItem('user', JSON.stringify(loginUser));
                } else {
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } catch (error) {
                toast.error('Error: ' + error);
                setUser(null);
                localStorage.removeItem('user');
            }
        }

        if (!user) {
            fetchCurrentUser();
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
