import { authKey } from '@/constants/auth.constant';
import { TResponseErrorType, TResponseSuccessType } from '@/types';
import { getFromLocalStorage } from '@/utils/localStorage';
import axios from 'axios';

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers['Accept'] = 'application/json';
axiosInstance.defaults.timeout = 60000;

axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken = getFromLocalStorage(authKey);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    // @ts-ignore
    function (response) {
        const responseObject: TResponseSuccessType = {
            data: response?.data?.data,
            meta: response?.data?.meta,
        };
        return responseObject;
    },
    function (error) {
        const responseObject: TResponseErrorType = {
            statusCode: error?.response?.data?.statusCode || 500,
            message: error?.response?.data?.message || 'Something went wrong!',
        };
        return Promise.reject(responseObject);
    },
);

export default axiosInstance;
