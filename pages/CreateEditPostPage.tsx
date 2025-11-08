
import React, { useState, useEffect, useCallback } from 'react';
import { NavigateFunction } from '../types';
import { postService } from '../services/postService';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';

interface CreateEditPostPageProps {
    navigate: NavigateFunction;
    postId?: string;
}

const CreateEditPostPage: React.FC<CreateEditPostPageProps> = ({ navigate, postId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();
    const isEditMode = !!postId;

    const fetchPost = useCallback(async () => {
        if (!isEditMode || !currentUser) return;
        setLoading(true);
        const post = await postService.getPostById(postId);
        if (post && post.authorId === currentUser.id) {
            setTitle(post.title);
            setContent(post.content);
        } else {
            setError('Post not found or you do not have permission to edit it.');
            // Redirect if user is not authorized
            setTimeout(() => navigate({ page: 'home' }), 2000);
        }
        setLoading(false);
    }, [postId, isEditMode, currentUser, navigate]);

    useEffect(() => {
        if (!currentUser) {
            navigate({ page: 'login' });
        }
        if (isEditMode) {
            fetchPost();
        }
    }, [currentUser, navigate, isEditMode, fetchPost]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim() || !currentUser) {
            setError('Title and content cannot be empty.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (isEditMode) {
                const updatedPost = await postService.updatePost(postId, title, content);
                if (updatedPost) {
                    navigate({ page: 'postDetail', postId: updatedPost.id });
                }
            } else {
                const newPost = await postService.createPost(title, content, currentUser);
                navigate({ page: 'postDetail', postId: newPost.id });
            }
        } catch (err) {
            setError('Failed to save the post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) {
        return <div className="text-center">Loading post for editing...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-secondary p-8 rounded-lg shadow-2xl">
            <h1 className="text-3xl font-bold mb-6">{isEditMode ? 'Edit Post' : 'Create a New Post'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input 
                    id="title" 
                    label="Title" 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    required 
                />
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-text-secondary mb-1">
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="w-full h-64 bg-accent border border-gray-600 rounded-md p-3 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-highlight"
                        placeholder="Write your amazing post here..."
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="secondary" onClick={() => navigate({ page: 'home' })}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : (isEditMode ? 'Update Post' : 'Publish Post')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateEditPostPage;
