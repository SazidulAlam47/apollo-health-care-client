import { authKey } from '@/constants/auth.constant';
import userLogout from '@/services/actions/userLogout';
import { getNewAccessToken, storeUserInfo } from '@/services/auth.service';
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
    async function (error) {
        const { config } = error;
        if (error?.status === 401 && !config.sent) {
            config.sent = true;
            const res = await getNewAccessToken();
            const accessToken = res.data.accessToken;
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
                storeUserInfo(accessToken);
                return axiosInstance(config);
            } else {
                userLogout();

                const responseObject: TResponseErrorType = {
                    statusCode: 401,
                    message: 'You are not Authorized!',
                };
                return Promise.reject(responseObject);
            }
        }

        const responseObject: TResponseErrorType = {
            statusCode: error?.status || 500,
            message: error?.response?.data?.message || 'Something went wrong!',
        };
        return Promise.reject(responseObject);
    },
);

export default axiosInstance;
