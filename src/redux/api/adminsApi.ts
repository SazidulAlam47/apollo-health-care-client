import { TAdmin, TMeta } from '@/types';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const adminsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createAdmin: build.mutation<TAdmin, any>({
            query: (data) => ({
                url: '/users/create-admin',
                method: 'POST',
                contentType: 'multipart/form-data',
                data,
            }),
            invalidatesTags: [tagTypes.admins],
        }),
        getAllAdmins: build.query({
            query: (args: Record<string, unknown>) => ({
                url: '/admins',
                method: 'GET',
                params: args,
            }),
            transformResponse: (response: TAdmin[], meta: TMeta) => {
                return {
                    admins: response,
                    meta,
                };
            },
            providesTags: [tagTypes.admins],
        }),
        getSingleAdmin: build.query<TAdmin, any>({
            query: (id: string) => ({
                url: `/admins/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.admins],
        }),
        deleteAdmin: build.mutation<TAdmin, any>({
            query: (id) => ({
                url: `/admins/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.admins],
        }),
        updateAdmin: build.mutation<TAdmin, any>({
            query: (args: { id: string; data: Partial<TAdmin> }) => ({
                url: `/admins/${args.id}`,
                method: 'PATCH',
                data: args.data,
            }),
            invalidatesTags: [tagTypes.admins],
        }),
    }),
});

export const {
    useCreateAdminMutation,
    useGetAllAdminsQuery,
    useGetSingleAdminQuery,
    useDeleteAdminMutation,
    useUpdateAdminMutation,
} = adminsApi;
