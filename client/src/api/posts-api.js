import axiosClient from './axios-client';

export const postsApi = {
    getPosts(objectParams) {
        return axiosClient.get('/post', { params: objectParams });
    },

    getPostById(id) {
        return axiosClient.get(`/post/${id}`);
    },

    getPostsByUserId(id) {
        return axiosClient.get(`/post/user/${id}`);
    },

    getTags() {
        return axiosClient.get('/post/tags');
    },

    createPost(formData) {
        return axiosClient.post('/post/create', formData);
    },

    likePost(id) {
        return axiosClient.post(`/post/${id}/like`);
    },
};
