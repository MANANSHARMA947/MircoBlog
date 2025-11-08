import React, { useState, useEffect, useCallback } from 'react';
import { Post, Comment, NavigateFunction } from '../types';
import { postService } from '../services/postService';
import { commentService } from '../services/commentService';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import CommentCard from '../components/CommentCard';
import Spinner from '../components/Spinner';

interface PostDetailPageProps {
    postId: string;
    navigate: NavigateFunction;
}

const PostDetailPage: React.FC<PostDetailPageProps> = ({ postId, navigate }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    const fetchPostAndComments = useCallback(async () => {
        setLoading(true);
        try {
            const fetchedPost = await postService.getPostById(postId);
            if (fetchedPost) {
                setPost(fetchedPost);
                const fetchedComments = await commentService.getCommentsByPostId(postId);
                setComments(fetchedComments);
            } else {
                setError('Post not found.');
            }
        } catch (err) {
            setError('Failed to load post data.');
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchPostAndComments();
    }, [fetchPostAndComments]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !currentUser || !post) return;
        
        const createdComment = await commentService.createComment(post.id, newComment, currentUser);
        setComments(prev => [...prev, createdComment]);
        setNewComment('');
    };
    
    const handleDeletePost = async () => {
        if (window.confirm('Are you sure you want to delete this post? This cannot be undone.')) {
            await postService.deletePost(postId);
            navigate({ page: 'home' });
        }
    };
    
    const handleDeleteComment = async (commentId: string) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            await commentService.deleteComment(commentId);
            setComments(prev => prev.filter(c => c.id !== commentId));
        }
    };

    if (loading) return <Spinner />;
    if (error) return <div className="text-center text-xl text-red-500">{error}</div>;
    if (!post) return <div className="text-center text-xl">Post not found.</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-secondary p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-4xl font-bold text-highlight">{post.title}</h1>
                        <p className="text-text-secondary mt-2">
                            By {post.authorUsername} on {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                     {currentUser && currentUser.id === post.authorId && (
                        <div className="flex space-x-2">
                            <Button onClick={() => navigate({ page: 'editPost', postId: post.id })} variant="secondary">Edit</Button>
                            <Button onClick={handleDeletePost} variant="danger">Delete</Button>
                        </div>
                    )}
                </div>
                <div className="prose prose-invert max-w-none text-text-primary text-lg whitespace-pre-wrap">{post.content}</div>
            </div>

            <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent pb-2">Comments ({comments.length})</h2>
                <div className="space-y-4 mb-8">
                    {comments.map(comment => (
                        <CommentCard key={comment.id} comment={comment} onDelete={handleDeleteComment}/>
                    ))}
                    {comments.length === 0 && <p className="text-text-secondary">No comments yet. Be the first!</p>}
                </div>
                {currentUser && (
                    <form onSubmit={handleCommentSubmit} className="bg-secondary p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Leave a Comment</h3>
                        <textarea
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            className="w-full bg-accent border border-gray-600 rounded-md p-3 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-highlight"
                            placeholder="What are your thoughts?"
                            rows={4}
                            required
                        ></textarea>
                        <Button type="submit" className="mt-4">Post Comment</Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PostDetailPage;