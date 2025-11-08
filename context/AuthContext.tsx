
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { authService } from '../services/authService';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { storageService } from '../services/storageService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        return storageService.get<User | null>(LOCAL_STORAGE_KEYS.CURRENT_USER, null);
    });
    
    useEffect(() => {
        // This effect syncs state changes to local storage.
        if (currentUser) {
            storageService.set(LOCAL_STORAGE_KEYS.CURRENT_USER, currentUser);
        } else {
            storageService.remove(LOCAL_STORAGE_KEYS.CURRENT_USER);
        }
    }, [currentUser]);

    const login = async (username: string, password_raw: string): Promise<User | null> => {
        const user = await authService.login(username, password_raw);
        setCurrentUser(user);
        return user;
    };

    const register = async (username: string, password_raw: string): Promise<User | null> => {
        const user = await authService.register(username, password_raw);
        setCurrentUser(user);
        return user;
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    const value = { currentUser, login, register, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
