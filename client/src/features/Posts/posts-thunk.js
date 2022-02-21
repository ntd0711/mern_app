import { createAsyncThunk } from '@reduxjs/toolkit';
import { postsApi } from '../../api/posts-api';

// First, create the thunk
export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async (payload, { rejectWithValue }) => {
    try {
      return await postsApi.getPosts(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'post/fetchPostById',
  async (id, { rejectWithValue }) => {
    try {
      return await postsApi.getPostById(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchTagsPost = createAsyncThunk(
  'post/fetchTagsPost',
  async (payload, { rejectWithValue }) => {
    try {
      return await postsApi.getTags();
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const createPost = createAsyncThunk('post/create', async (payload, { rejectWithValue }) => {
  try {
    return await postsApi.createPost(payload);
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const deletePost = createAsyncThunk('post/delete', async (id, { rejectWithValue }) => {
  try {
    return await postsApi.deletePost(id);
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const updatePost = createAsyncThunk('post/update', async (payload, { rejectWithValue }) => {
  try {
    return await postsApi.updatePost(payload);
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const commentPost = createAsyncThunk(
  'post/comment',
  async (payload, { rejectWithValue }) => {
    try {
      return await postsApi.commentPost(payload);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
