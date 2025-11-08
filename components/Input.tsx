
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1">
                {label}
            </label>
            <input
                id={id}
                className="w-full bg-accent border border-gray-600 rounded-md px-3 py-2 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-highlight focus:border-highlight"
                {...props}
            />
        </div>
    );
};

export default Input;
