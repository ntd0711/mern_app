import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from 'api/user-api';

export const login = createAsyncThunk('user/signin', async (payload, { rejectWithValue }) => {
  try {
    return await userApi.signin(payload);
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('user/signout', async (payload, { rejectWithValue }) => {
  try {
    return await userApi.signout(payload);
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const register = createAsyncThunk('user/signup', async (payload, { rejectWithValue }) => {
  try {
    return await userApi.signup(payload);
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const updateInfo = createAsyncThunk(
  'user/update-info',
  async (payload, { rejectWithValue }) => {
    try {
      return await userApi.updateInfo(payload);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const unsetAvatar = createAsyncThunk(
  'user/unset-avatar',
  async (userId, { rejectWithValue }) => {
    try {
      return await userApi.unsetAvatar(userId);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'user/update-avatar',
  async (data, { rejectWithValue }) => {
    try {
      return await userApi.updateAvatar(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
