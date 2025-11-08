import React, { useState, useCallback, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostDetailPage from './pages/PostDetailPage';
import CreateEditPostPage from './pages/CreateEditPostPage';
import { View } from './types';
import { seedInitialData } from './services/seedData';
import Footer from './components/Footer';

const App: React.FC = () => {
    const [view, setView] = useState<View>({ page: 'home' });

    useEffect(() => {
        seedInitialData();
    }, []);

    const navigate = useCallback((newView: View) => {
        window.scrollTo(0, 0);
        setView(newView);
    }, []);

    const renderContent = () => {
        switch (view.page) {
            case 'home':
                return <HomePage navigate={navigate} />;
            case 'login':
                return <LoginPage navigate={navigate} />;
            case 'postDetail':
                return <PostDetailPage postId={view.postId!} navigate={navigate} />;
            case 'createPost':
                return <CreateEditPostPage navigate={navigate} />;
            case 'editPost':
                return <CreateEditPostPage postId={view.postId} navigate={navigate} />;
            default:
                return <HomePage navigate={navigate} />;
        }
    };

    return (
        <AuthProvider>
            <div className="min-h-screen bg-primary text-text-primary font-sans flex flex-col">
                <Header navigate={navigate} />
                <main className="container mx-auto px-4 py-8 flex-grow">
                    {renderContent()}
                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
};

export default App;