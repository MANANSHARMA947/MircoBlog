import { storageService } from './storageService';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { User, Post, Comment } from '../types';

// In a real app, this would be a secure, one-way hashing algorithm like bcrypt.
// This must match the hashing logic in authService.
const simpleHash = (password: string): string => {
    return `sim_hash|${password.split('').reverse().join('')}`;
};

const seedUsers: User[] = [
    {
        id: 'user-1',
        username: 'demo',
        passwordHash: simpleHash('demo123'),
        createdAt: '2023-10-26T10:00:00Z',
    },
    {
        id: 'user-2',
        username: 'jane_doe',
        passwordHash: simpleHash('password123'),
        createdAt: '2023-10-25T11:00:00Z',
    },
];

const seedPosts: Post[] = [
    {
        id: 'post-1',
        title: 'Exploring the World of Microservices',
        content: 'Microservices architecture has become a popular way to build complex applications. It involves breaking down a large application into smaller, independently deployable services.\n\nEach service runs in its own process and communicates with other services through well-defined APIs. This approach offers several benefits, including improved scalability, flexibility, and resilience. However, it also introduces challenges related to data consistency, service discovery, and monitoring.',
        authorId: 'user-1',
        authorUsername: 'demo',
        createdAt: '2023-10-27T14:30:00Z',
        updatedAt: '2023-10-27T14:30:00Z',
    },
    {
        id: 'post-2',
        title: 'A Guide to Modern Frontend Development with React',
        content: 'React has revolutionized the way we build user interfaces. Its component-based architecture allows developers to create reusable UI elements and manage application state efficiently.\n\nWhen combined with tools like TypeScript, Tailwind CSS, and state management libraries, React provides a powerful foundation for building modern, scalable, and maintainable web applications. The key is to understand the core concepts and choose the right tools for your project.',
        authorId: 'user-2',
        authorUsername: 'jane_doe',
        createdAt: '2023-10-26T18:00:00Z',
        updatedAt: '2023-10-26T18:00:00Z',
    },
    {
        id: 'post-3',
        title: 'The Importance of UI/UX Design',
        content: 'Good design is not just about aesthetics; it\'s about creating a seamless and intuitive user experience. A well-designed application is easy to use, efficient, and enjoyable.\n\nInvesting in UI/UX design can lead to higher user engagement, increased customer satisfaction, and a stronger brand identity. It\'s a crucial aspect of product development that should not be overlooked.',
        authorId: 'user-1',
        authorUsername: 'demo',
        createdAt: '2023-10-25T09:15:00Z',
        updatedAt: '2023-10-25T09:15:00Z',
    },
];

const seedComments: Comment[] = [
    {
        id: 'comment-1',
        content: 'Great overview! I\'ve been working with microservices for a while and the benefits are definitely worth the complexity.',
        postId: 'post-1',
        authorId: 'user-2',
        authorUsername: 'jane_doe',
        createdAt: '2023-10-27T15:00:00Z',
    },
    {
        id: 'comment-2',
        content: 'Totally agree. The learning curve for managing distributed systems can be steep.',
        postId: 'post-1',
        authorId: 'user-1',
        authorUsername: 'demo',
        createdAt: '2023-10-27T15:10:00Z',
    },
     {
        id: 'comment-3',
        content: 'React hooks have been a game-changer for state management in functional components.',
        postId: 'post-2',
        authorId: 'user-1',
        authorUsername: 'demo',
        createdAt: '2023-10-26T19:00:00Z',
    },
];


export const seedInitialData = () => {
    const users = storageService.get(LOCAL_STORAGE_KEYS.USERS, []);
    if (users.length === 0) {
        storageService.set(LOCAL_STORAGE_KEYS.USERS, seedUsers);
    }

    const posts = storageService.get(LOCAL_STORAGE_KEYS.POSTS, []);
    if (posts.length === 0) {
        storageService.set(LOCAL_STORAGE_KEYS.POSTS, seedPosts);
    }
    
    const comments = storageService.get(LOCAL_STORAGE_KEYS.COMMENTS, []);
    if (comments.length === 0) {
        storageService.set(LOCAL_STORAGE_KEYS.COMMENTS, seedComments);
    }
};