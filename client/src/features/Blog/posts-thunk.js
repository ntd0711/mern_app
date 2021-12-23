import { createAsyncThunk } from '@reduxjs/toolkit';
import { postsApi } from '../../api/posts-api';

// First, create the thunk
export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
    return await postsApi.getPosts();
});

export const createPost = createAsyncThunk('post/create', async (payload) => {
    return await postsApi.createPost(payload);
});

export const likePost = createAsyncThunk('post/like', async (id) => {
    return await postsApi.likePost(id);
});
