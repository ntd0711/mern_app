import axiosClient from './axios-client';

export const userApi = {
  signin(data) {
    return axiosClient.post('/user/login', data);
  },

  signout(data) {
    return axiosClient.post('/user/logout', data);
  },

  signup(data) {
    return axiosClient.post('/user/register', data);
  },

  refreshToken(data) {
    return axiosClient.post('/user/refresh-token', data);
  },

  getUserById(id) {
    return axiosClient.get(`/user/${id}`);
  },

  getPostsCreatedByUser(userId) {
    return axiosClient.get(`/user/posts-created/${userId}`);
  },

  getPostsSavedByUser() {
    return axiosClient.get('/user/posts-saved');
  },

  updateInfo({ id, data }) {
    return axiosClient.post(`/user/update-info/${id}`, data);
  },

  updateAvatar(data) {
    const id = data?.id;
    return axiosClient.post(`/user/update-avt/${id}`, data);
  },

  unsetAvatar(id) {
    return axiosClient.post(`/user/unset-avt/${id}`);
  },

  savePost(data) {
    return axiosClient.post('/user/post/save', data);
  },

  vote(data) {
    return axiosClient.post('/user/vote', data);
  },
};
