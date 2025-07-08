import { TMeta, TSpecialty } from '@/types';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const specialtiesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSpecialties: build.mutation<TSpecialty, any>({
            query: (data) => ({
                url: '/specialties',
                method: 'POST',
                contentType: 'multipart/form-data',
                data,
            }),
            invalidatesTags: [tagTypes.specialties],
        }),
        getAllSpecialties: build.query({
            query: (args: Record<string, unknown>) => ({
                url: '/specialties',
                method: 'GET',
                params: args,
            }),
            transformResponse: (response: TSpecialty[], meta: TMeta) => {
                return {
                    specialties: response,
                    meta,
                };
            },
            providesTags: [tagTypes.specialties],
        }),
        deleteSpecialties: build.mutation<TSpecialty, any>({
            query: (id) => ({
                url: `/specialties/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.specialties],
        }),
    }),
});

export const {
    useCreateSpecialtiesMutation,
    useGetAllSpecialtiesQuery,
    useDeleteSpecialtiesMutation,
} = specialtiesApi;
