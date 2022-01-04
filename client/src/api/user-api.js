import axiosClient from './axios-client';

export const userApi = {
    signin(data) {
        return axiosClient.post('/user/signin', data);
    },

    signup(data) {
        return axiosClient.post('/user/signup', data);
    },

    getUserById(id) {
        return axiosClient.get(`/user/${id}`);
    },

    updateInfo(data) {
        return axiosClient.post(`/user/update-info/${data.id}`, data);
    },

    updateAvatar(formData) {
        const id = formData?.get('id');
        return axiosClient.post(`/user/update-avt/${id}`, formData);
    },

    unsetAvatar(id) {
        return axiosClient.post(`/user/unset-avt/${id}`);
    },
};
