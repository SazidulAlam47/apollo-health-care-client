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
        forgotPassword: build.mutation<null, any>({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                data,
            }),
        }),
        resetPassword: build.mutation<null, any>({
            query: (args) => ({
                url: '/auth/reset-password',
                method: 'POST',
                data: args.data,
                headers: {
                    Authorization: `Bearer ${args.token}`,
                },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
