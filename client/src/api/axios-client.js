import axios from 'axios';
import { getToken, setToken } from 'utils/common';
import { userApi } from './user-api';

const axiosClient = axios.create({
  // baseURL: 'https://frontendeverything.herokuapp.com/api',
  baseURL: 'http://localhost:8888/api',
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const token = getToken('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },

  async function (error) {
    const originalConfig = error.config;
    if (
      error.response?.status === 401 &&
      error.response?.data.message === 'jwt expired' &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;

      try {
        const rfToken = getToken('refreshToken');

        const response = await userApi.refreshToken({ rfToken });
        const { token, refreshToken } = response;

        setToken(token, refreshToken);
        axiosClient.defaults.headers.Authorization = token;

        return axiosClient(originalConfig);
      } catch (_error) {
        if (_error.response && _error.response.data.message) {
          return Promise.reject(_error.response.data.message);
        }

        return Promise.reject(_error);
      }
    } else {
      throw new Error(error.response?.data.message);
    }
    // if (error.response && error.response.status >= 400) {
    //   throw new Error(error.response.data.message);
    // }
    // return Promise.reject(error);
  }
);

export default axiosClient;
