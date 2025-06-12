'use server';
import { TLoginInputs } from '@/app/login/page';

const userLogin = async (data: TLoginInputs) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
            cache: 'no-store',
        },
    );
    const userInfo = await res.json();
    return userInfo;
};

export default userLogin;
