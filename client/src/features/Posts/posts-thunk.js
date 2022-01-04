import { createAsyncThunk } from '@reduxjs/toolkit';
import { postsApi } from '../../api/posts-api';

// First, create the thunk
export const fetchPosts = createAsyncThunk('post/fetchPosts', async (payload) => {
    return await postsApi.getPosts(payload);
});

export const fetchTagsPost = createAsyncThunk('post/fetchTagsPost', async () => {
    return await postsApi.getTags();
});

export const createPost = createAsyncThunk('post/create', async (payload) => {
    return await postsApi.createPost(payload);
});

export const likePost = createAsyncThunk('post/like', async (id) => {
    return await postsApi.likePost(id);
});
