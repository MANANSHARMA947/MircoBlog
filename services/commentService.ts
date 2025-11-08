
import { Comment, User } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { storageService } from './storageService';

const FAKE_LATENCY = 200;

const getCommentsFromStorage = (): Comment[] => {
    return storageService.get<Comment[]>(LOCAL_STORAGE_KEYS.COMMENTS, []);
};

const saveCommentsToStorage = (comments: Comment[]) => {
    storageService.set(LOCAL_STORAGE_KEYS.COMMENTS, comments);
};

export const commentService = {
    getCommentsByPostId: async (postId: string): Promise<Comment[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const allComments = getCommentsFromStorage();
                const postComments = allComments
                    .filter(c => c.postId === postId)
                    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                resolve(postComments);
            }, FAKE_LATENCY);
        });
    },

    createComment: async (postId: string, content: string, author: User): Promise<Comment> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const allComments = getCommentsFromStorage();
                const newComment: Comment = {
                    id: crypto.randomUUID(),
                    content,
                    postId,
                    authorId: author.id,
                    authorUsername: author.username,
                    createdAt: new Date().toISOString(),
                };
                saveCommentsToStorage([...allComments, newComment]);
                resolve(newComment);
            }, FAKE_LATENCY);
        });
    },

    deleteComment: async (id: string): Promise<boolean> => {
        return new Promise(resolve => {
            setTimeout(() => {
                let comments = getCommentsFromStorage();
                const initialLength = comments.length;
                comments = comments.filter(c => c.id !== id);
                if (comments.length < initialLength) {
                    saveCommentsToStorage(comments);
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, FAKE_LATENCY);
        });
    }
};
