import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from 'api/user-api';

export const login = createAsyncThunk('user/signin', async (payload) => {
  return await userApi.signin(payload);
});

export const logout = createAsyncThunk('user/signout', async (payload) => {
  return await userApi.signout(payload);
});

export const register = createAsyncThunk('user/signup', async (payload) => {
  return await userApi.signup(payload);
});

export const updateInfo = createAsyncThunk('user/update-info', async (payload) => {
  return await userApi.updateInfo(payload);
});

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
