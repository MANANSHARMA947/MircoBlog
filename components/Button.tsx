
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
    const baseClasses = "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variantClasses = {
        primary: 'bg-highlight text-primary hover:bg-teal-400 focus:ring-highlight',
        secondary: 'bg-accent text-text-primary hover:bg-gray-600 focus:ring-gray-500',
        danger: 'bg-red-600 text-text-primary hover:bg-red-700 focus:ring-red-500',
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
