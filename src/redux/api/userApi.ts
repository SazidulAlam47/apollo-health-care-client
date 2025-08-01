import { IUser } from '@/types';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserInfo: build.query<IUser, any>({
            query: () => ({
                url: '/users/me',
                method: 'GET',
            }),
            providesTags: [tagTypes.user],
        }),
        updateProfile: build.mutation<IUser, any>({
            query: (data) => ({
                url: '/users/update-my-profile',
                method: 'PATCH',
                contentType: 'multipart/form-data',
                data,
            }),
            invalidatesTags: [tagTypes.user],
        }),
    }),
});

export const { useGetUserInfoQuery, useUpdateProfileMutation } = usersApi;
