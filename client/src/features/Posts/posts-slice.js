import { createSlice } from '@reduxjs/toolkit';
import { createPost, fetchPosts, fetchTagsPost, likePost } from './posts-thunk';

const initialState = {
    postList: [],
    postDetail: {},
    postTags: [],
};

export const postsSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.postList = action.payload;
        });

        builder.addCase(fetchTagsPost.fulfilled, (state, action) => {
            state.postTags = action.payload;
        });

        builder.addCase(createPost.fulfilled, (state, action) => {
            state.postList.push(action.payload.newPost);
            state.postTags = action.payload.allTagsPost;
        });

        builder.addCase(likePost.fulfilled, (state, action) => {
            const { _id } = action.payload;
            const index = state.postList.findIndex((post) => post._id === _id);
            state.postList.splice(index, 1, action.payload);
        });
    },
});

const { reducer } = postsSlice;

export default reducer;
