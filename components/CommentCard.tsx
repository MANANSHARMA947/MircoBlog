
import React from 'react';
import { Comment } from '../types';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';

interface CommentCardProps {
    comment: Comment;
    onDelete: (commentId: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onDelete }) => {
    const { currentUser } = useAuth();
    
    return (
        <div className="bg-accent p-4 rounded-lg">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-text-secondary text-sm">
                        <span className="font-bold text-highlight">{comment.authorUsername}</span>
                        {' - '}
                        {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    <p className="text-text-primary mt-1">{comment.content}</p>
                </div>
                {currentUser && currentUser.id === comment.authorId && (
                    <Button onClick={() => onDelete(comment.id)} variant="danger" className="text-xs px-2 py-1">
                        Delete
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CommentCard;
