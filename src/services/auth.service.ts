import { authKey } from '@/constants/auth.constant';
import axiosInstance from '@/helpers/axios/axiosInstance';
import { decodeToken } from '@/utils/jwt';
import {
    getFromLocalStorage,
    removeFromLocalStorage,
    setToLocalStorage,
} from '@/utils/localStorage';

export const storeUserInfo = (token: string) => {
    return setToLocalStorage(authKey, token);
};

export const getUserInfo = () => {
    const token = getFromLocalStorage(authKey);

    if (!token) {
        return null;
    }

    const decodedUser = decodeToken(token);

    return decodedUser;
};

export const getIsLoggedIn = () => {
    return !!getUserInfo();
};

export const removeUser = () => {
    return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
    const res = await axiosInstance.get('/auth/refresh-token');
    return res.data.accessToken as string | undefined;
};
