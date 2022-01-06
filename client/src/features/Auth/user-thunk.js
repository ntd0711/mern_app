import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from 'api/user-api';

export const login = createAsyncThunk('user/signin', async (payload, thunkApi) => {
    try {
        return await userApi.signin(payload);
    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue(error);
    }
});

export const register = createAsyncThunk('user/signup', async (payload, thunkApi) => {
    try {
        return await userApi.signup(payload);
    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue(error);
    }
});
