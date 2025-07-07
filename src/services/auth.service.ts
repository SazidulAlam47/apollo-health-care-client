import { authKey } from '@/constants/auth.constant';
import { decodeToken } from '@/utils/jwt';
import {
    getFromLocalStorage,
    removeFromLocalStorage,
    setToLocalStorage,
} from '@/utils/localStorage';
import axios from 'axios';

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
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
        { withCredentials: true },
    );

    return res.data.data.accessToken as string | undefined;
};
