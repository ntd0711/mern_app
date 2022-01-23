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
};
