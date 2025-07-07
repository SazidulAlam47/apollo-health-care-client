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
    return await axiosInstance({
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
};
