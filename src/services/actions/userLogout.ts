import { removeUser } from '../auth.service';

const userLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
    }); // remove refresh token
    removeUser(); // remove access token
    return null;
};

export default userLogout;
