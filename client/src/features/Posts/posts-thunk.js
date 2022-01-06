import { createAsyncThunk } from '@reduxjs/toolkit';
import { postsApi } from '../../api/posts-api';

// First, create the thunk
export const fetchPosts = createAsyncThunk('post/fetchPosts', async (payload, thunkApi) => {
    try {
        return await postsApi.getPosts(payload);
    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue(error);
    }
});

export const fetchTagsPost = createAsyncThunk('post/fetchTagsPost', async (payload, thunkApi) => {
    try {
        return await postsApi.getTags();
    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue(error);
    }
});

export const createPost = createAsyncThunk('post/create', async (payload, thunkApi) => {
    try {
        return await postsApi.createPost(payload);
    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue(error);
    }
});

export const likePost = createAsyncThunk('post/like', async (id, thunkApi) => {
    try {
        return await postsApi.likePost(id);
    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue(error);
    }
});
