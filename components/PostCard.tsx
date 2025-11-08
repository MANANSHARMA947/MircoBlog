import React from 'react';
import { Post, NavigateFunction } from '../types';

interface PostCardProps {
    post: Post;
    navigate: NavigateFunction;
}

// Simple hash function to get a color from a string
const getAvatarColor = (username: string) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
}


const PostCard: React.FC<PostCardProps> = ({ post, navigate }) => {
    const avatarColor = getAvatarColor(post.authorUsername);
    const authorInitial = post.authorUsername.charAt(0).toUpperCase();

    return (
        <div 
            className="bg-secondary p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
            onClick={() => navigate({ page: 'postDetail', postId: post.id })}
        >
            <h2 className="text-2xl font-bold text-highlight mb-3 line-clamp-2 h-[3.75rem]">{post.title}</h2>
            
            <div className="flex items-center space-x-3 mb-4 text-sm text-text-secondary">
                <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ backgroundColor: `#${avatarColor}` }}
                >
                    {authorInitial}
                </div>
                <span>{post.authorUsername}</span>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            
            <p className="text-text-primary flex-grow line-clamp-3">{post.content}</p>
            
            <div className="mt-6">
                <span className="text-highlight font-semibold hover:underline">Read More →</span>
            </div>
        </div>
    );
};

export default PostCard;