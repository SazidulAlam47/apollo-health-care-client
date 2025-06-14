import { authKey } from '@/constants/auth.constant';
import { TDecodedUser } from '@/types';
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

    const decodedUser = decodeToken(token) as TDecodedUser;

    if (!decodedUser) {
        return removeUser();
    }

    return decodedUser;

    // return {
    //     ...decodedUser,
    //     role: decodedUser.role.toLocaleLowerCase(),
    // };
};

export const getIsLoggedIn = () => {
    return !!getUserInfo();
};

export const removeUser = () => {
    return removeFromLocalStorage(authKey);
};
