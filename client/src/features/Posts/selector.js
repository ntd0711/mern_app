import { createSelector } from '@reduxjs/toolkit';

const selectPostList = (state) => state.posts.postList;

export const postTagsCalc = createSelector(selectPostList, (posts) => {
    const postTags = posts.reduce((arr, item) => arr.concat(item.tags), []);
    return Array.from(new Set(postTags));
});
