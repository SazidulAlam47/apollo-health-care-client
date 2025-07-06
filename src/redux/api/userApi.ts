import { IUser } from '@/types';
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
    }),
});

export const { useGetSingleUserQuery } = usersApi;
