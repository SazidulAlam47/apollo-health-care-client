import { ILogin, IUser } from '@/types';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSingleUser: build.query<IUser, object>({
            query: () => ({
                url: '/users/me',
                method: 'GET',
            }),
            providesTags: [tagTypes.user],
        }),
        login: build.mutation<ILogin, object>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                data,
            }),
            invalidatesTags: [tagTypes.user],
        }),
    }),
});

export const { useGetSingleUserQuery, useLoginMutation } = usersApi;
