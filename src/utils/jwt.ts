import { TDecodedUser } from '@/types';
import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string) => {
    if (!token) {
        return null;
    }
    try {
        return jwtDecode(token) as TDecodedUser;
    } catch (error) {
        return null;
    }
};
