
export interface User {
    id: string;
    username: string;
    // Password is only used for simulation and should not be stored like this in a real app
    passwordHash: string; 
    createdAt: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorUsername: string;
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    id: string;
    content: string;
    postId: string;
    authorId: string;
    authorUsername: string;
    createdAt: string;
}

export interface AuthContextType {
    currentUser: User | null;
    login: (username: string, password_raw: string) => Promise<User | null>;
    register: (username: string, password_raw: string) => Promise<User | null>;
    logout: () => void;
}

export type View = 
    | { page: 'home' }
    | { page: 'login' }
    | { page: 'postDetail'; postId: string }
    | { page: 'createPost' }
    | { page: 'editPost'; postId: string };

export type NavigateFunction = (view: View) => void;
