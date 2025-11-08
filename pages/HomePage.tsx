import React, { useState, useEffect } from 'react';
import { Post, NavigateFunction } from '../types';
import { postService } from '../services/postService';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';

interface HomePageProps {
    navigate: NavigateFunction;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const fetchedPosts = await postService.getPosts();
            setPosts(fetchedPosts);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="space-y-12">
            <div className="text-center py-12 bg-secondary rounded-lg shadow-xl">
                 <h1 className="text-5xl font-bold text-white">Welcome to <span className="text-highlight">MicroBlog</span></h1>
                 <p className="text-text-secondary mt-4 text-lg max-w-2xl mx-auto">
                     A place for ideas, stories, and conversations. Explore the latest posts from our community.
                 </p>
                 {currentUser && (
                     <Button onClick={() => navigate({ page: 'createPost' })} className="mt-8 text-lg px-8 py-3">
                         Create a New Post
                     </Button>
                 )}
            </div>
            
            <h2 className="text-4xl font-bold border-b-4 border-highlight pb-2">Latest Posts</h2>

            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} navigate={navigate} />
                    ))}
                </div>
            ) : (
                <div className="text-center bg-secondary p-8 rounded-lg">
                    <h2 className="text-2xl text-text-secondary">No posts yet.</h2>
                    <p className="mt-2 text-text-secondary">Why not create the first one?</p>
                </div>
            )}
        </div>
    );
};

export default HomePage;