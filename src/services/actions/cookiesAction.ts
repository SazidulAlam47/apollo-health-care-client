'use server';

import { cookies } from 'next/headers';

export const getCookies = (key: string) => cookies().get(key)?.value;

export const setCookies = async (key: string, value: string) => {
    cookies().set(key, value);
};

export const removeCookies = async (key: string) => {
    cookies().delete(key);
};
