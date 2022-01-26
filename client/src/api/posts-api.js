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

  createPost(data) {
    return axiosClient.post('/post/create', data);
  },

  deletePost(id) {
    return axiosClient.delete(`/post/${id}/delete`);
  },

  likePost(id) {
    return axiosClient.patch(`/post/${id}/like`);
  },

  commentPost(data) {
    return axiosClient.post(`/post/${data.postId}/comment`, data);
  },

  updatePost({ id, data }) {
    return axiosClient.patch(`/post/${id}/update`, data);
  },
};
