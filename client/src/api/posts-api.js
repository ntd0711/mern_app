import axiosClient from './axios-client';

export const postsApi = {
    getPosts() {
        return axiosClient.get('/post');
    },

    createPost(formData) {
        return axiosClient.post('/post', formData);
    },

    likePost(id) {
        return axiosClient.post(`/post/${id}`);
    },
};
