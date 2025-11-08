// FIX: Import the `Comment` type to resolve a type error in `deletePost`.
import { Post, User, Comment } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { storageService } from './storageService';

const FAKE_LATENCY = 300;

const getPostsFromStorage = (): Post[] => {
    return storageService.get<Post[]>(LOCAL_STORAGE_KEYS.POSTS, []);
};

const savePostsToStorage = (posts: Post[]) => {
    storageService.set(LOCAL_STORAGE_KEYS.POSTS, posts);
};

export const postService = {
    getPosts: async (): Promise<Post[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const posts = getPostsFromStorage();
                resolve(posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
            }, FAKE_LATENCY);
        });
    },

    getPostById: async (id: string): Promise<Post | null> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const posts = getPostsFromStorage();
                resolve(posts.find(p => p.id === id) || null);
            }, FAKE_LATENCY);
        });
    },

    createPost: async (title: string, content: string, author: User): Promise<Post> => {
         return new Promise(resolve => {
            setTimeout(() => {
                const posts = getPostsFromStorage();
                const now = new Date().toISOString();
                const newPost: Post = {
                    id: crypto.randomUUID(),
                    title,
                    content,
                    authorId: author.id,
                    authorUsername: author.username,
                    createdAt: now,
                    updatedAt: now,
                };
                savePostsToStorage([...posts, newPost]);
                resolve(newPost);
            }, FAKE_LATENCY);
        });
    },
    
    updatePost: async (id: string, title: string, content: string): Promise<Post | null> => {
        return new Promise(resolve => {
            setTimeout(() => {
                let posts = getPostsFromStorage();
                const postIndex = posts.findIndex(p => p.id === id);
                if (postIndex === -1) {
                    resolve(null);
                    return;
                }
                const updatedPost = {
                    ...posts[postIndex],
                    title,
                    content,
                    updatedAt: new Date().toISOString(),
                };
                posts[postIndex] = updatedPost;
                savePostsToStorage(posts);
                resolve(updatedPost);
            }, FAKE_LATENCY);
        });
    },

    deletePost: async (id: string): Promise<boolean> => {
        return new Promise(resolve => {
            setTimeout(() => {
                let posts = getPostsFromStorage();
                const initialLength = posts.length;
                posts = posts.filter(p => p.id !== id);
                if (posts.length < initialLength) {
                    savePostsToStorage(posts);
                    // Also delete associated comments
                    let comments = storageService.get<Comment[]>(LOCAL_STORAGE_KEYS.COMMENTS, []);
                    comments = comments.filter(c => c.postId !== id);
                    storageService.set(LOCAL_STORAGE_KEYS.COMMENTS, comments);
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, FAKE_LATENCY);
        });
    }
};