import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { NavigateFunction } from '../types';
import Button from './Button';

interface HeaderProps {
    navigate: NavigateFunction;
}

const Header: React.FC<HeaderProps> = ({ navigate }) => {
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate({ page: 'home' });
    };

    return (
        <header className="sticky top-0 z-50 bg-secondary/80 backdrop-blur-sm shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 
                    className="text-2xl md:text-3xl font-bold text-highlight cursor-pointer transition-transform hover:scale-105"
                    onClick={() => navigate({ page: 'home' })}
                >
                    MicroBlog
                </h1>
                <nav className="flex items-center space-x-2 md:space-x-4">
                    {currentUser ? (
                        <>
                            <span className="text-text-secondary hidden sm:inline">Welcome, {currentUser.username}!</span>
                            <Button onClick={() => navigate({ page: 'createPost' })} variant="secondary">New Post</Button>
                            <Button onClick={handleLogout} variant="danger">Logout</Button>
                        </>
                    ) : (
                        <Button onClick={() => navigate({ page: 'login' })}>Login / Register</Button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;