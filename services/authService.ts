
import { User } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { storageService } from './storageService';

const FAKE_LATENCY = 250;

// In a real app, this would be a secure, one-way hashing algorithm like bcrypt.
// For this simulation, we are just using a simple transformation.
const simpleHash = (password: string): string => {
    // This is not secure and is for demonstration purposes only.
    return `sim_hash|${password.split('').reverse().join('')}`;
};

const verifyPassword = (password: string, hash: string): boolean => {
    return simpleHash(password) === hash;
};

export const authService = {
    login: async (username: string, password_raw: string): Promise<User | null> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const users = storageService.get<User[]>(LOCAL_STORAGE_KEYS.USERS, []);
                const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
                if (user && verifyPassword(password_raw, user.passwordHash)) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            }, FAKE_LATENCY);
        });
    },

    register: async (username: string, password_raw: string): Promise<User | null> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const users = storageService.get<User[]>(LOCAL_STORAGE_KEYS.USERS, []);
                const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());

                if (existingUser) {
                    resolve(null); // Username is already taken
                    return;
                }

                const newUser: User = {
                    id: crypto.randomUUID(),
                    username,
                    passwordHash: simpleHash(password_raw),
                    createdAt: new Date().toISOString(),
                };

                const updatedUsers = [...users, newUser];
                storageService.set(LOCAL_STORAGE_KEYS.USERS, updatedUsers);
                resolve(newUser);
            }, FAKE_LATENCY);
        });
    },

    logout: (): void => {
        // The actual state update happens in AuthContext.
        // This function is here to be symmetric with a real API and clear any related storage.
        storageService.remove(LOCAL_STORAGE_KEYS.CURRENT_USER);
    }
};
