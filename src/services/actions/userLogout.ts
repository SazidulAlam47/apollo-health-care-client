import { removeUser } from '../auth.service';
import axiosInstance from '@/helpers/axios/axiosInstance';

const userLogout = async () => {
    await axiosInstance.get('/auth/logout'); // remove refresh token
    removeUser(); // remove access token
    return null;
};

export default userLogout;
