import { createSlice } from '@reduxjs/toolkit';
import { notify } from 'utils/toastify';
import { login, register } from './user-thunk';

const initialState = {
    profile: JSON.parse(localStorage.getItem('profile'))?.user || null,
    token: JSON.parse(localStorage.getItem('profile'))?.token || null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.profile = null;
            state.token = null;

            localStorage.removeItem('profile');
        },
        updateProfile: (state, action) => {
            state.profile = action.payload;
            const user = { user: action.payload, token: state.token };

            localStorage.setItem('profile', JSON.stringify(user));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.profile = action.payload?.user;
            state.token = action.payload?.token;

            localStorage.setItem('profile', JSON.stringify(action.payload));
        });
        builder.addCase(login.rejected, (state, action) => {
            notify.error(action.payload.message);
        });

        builder.addCase(register.fulfilled, (state, action) => {
            state.profile = action.payload?.user;
            state.token = action.payload?.token;
            notify.success('register account successfully!');
            localStorage.setItem('profile', JSON.stringify(action.payload));
        });
        builder.addCase(register.rejected, (state, action) => {
            notify.error(action.payload.message);
        });
    },
});

const { reducer, actions } = userSlice;
export const { logout, updateProfile } = actions;

export default reducer;
