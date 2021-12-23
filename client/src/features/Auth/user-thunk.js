import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from 'api/user-api';

export const login = createAsyncThunk('user/signin', async (payload) => {
    return await userApi.signin(payload);
});

export const register = createAsyncThunk('user/signup', async (payload) => {
    return await userApi.signup(payload);
});
