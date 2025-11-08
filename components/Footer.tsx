import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-secondary mt-12 py-6">
            <div className="container mx-auto px-4 text-center text-text-secondary">
                <p>&copy; {new Date().getFullYear()} MicroBlog. All rights reserved.</p>
                <p className="text-sm mt-1">A demo project showcasing a micro-blogging platform.</p>
            </div>
        </footer>
    );
};

export default Footer;