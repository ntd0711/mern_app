import axiosClient from './axios-client';

export const userApi = {
    signin(formData) {
        return axiosClient.post('/user/signin', formData);
    },

    signup(formData) {
        return axiosClient.post('/user/signin', formData);
    },
};
