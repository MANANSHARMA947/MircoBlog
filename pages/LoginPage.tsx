
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { NavigateFunction } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';

interface LoginPageProps {
    navigate: NavigateFunction;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!username || !password) {
            setError('Username and password are required.');
            setLoading(false);
            return;
        }

        try {
            const user = isLogin 
                ? await login(username, password)
                : await register(username, password);

            if (user) {
                navigate({ page: 'home' });
            } else {
                setError(isLogin ? 'Invalid credentials.' : 'Username already taken.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-secondary p-8 rounded-lg shadow-2xl">
            <div className="flex border-b border-accent mb-6">
                <button 
                    onClick={() => setIsLogin(true)} 
                    className={`flex-1 py-2 font-semibold ${isLogin ? 'text-highlight border-b-2 border-highlight' : 'text-text-secondary'}`}
                >
                    Login
                </button>
                <button 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 font-semibold ${!isLogin ? 'text-highlight border-b-2 border-highlight' : 'text-text-secondary'}`}
                >
                    Register
                </button>
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input id="username" label="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                <Input id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;
