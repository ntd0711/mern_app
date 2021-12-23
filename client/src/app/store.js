import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/Blog/posts-slice';
import userReducer from '../features/Auth/user-slice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        user: userReducer,
    },
});
