import { ILogin } from '@/types';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<ILogin, any>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                data,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        changePassword: build.mutation<null, any>({
            query: (data) => ({
                url: '/auth/change-password',
                method: 'POST',
                data,
            }),
        }),
    }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
