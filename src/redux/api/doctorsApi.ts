import { TDoctor, TMeta } from '@/types';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const doctorsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctor: build.mutation<TDoctor, any>({
            query: (data) => ({
                url: '/users/create-doctor',
                method: 'POST',
                contentType: 'multipart/form-data',
                data,
            }),
            invalidatesTags: [tagTypes.doctors],
        }),
        getAllDoctors: build.query({
            query: (args: Record<string, unknown>) => ({
                url: '/doctors',
                method: 'GET',
                params: args,
            }),
            transformResponse: (response: TDoctor[], meta: TMeta) => {
                return {
                    doctors: response,
                    meta,
                };
            },
            providesTags: [tagTypes.doctors],
        }),
        getSingleDoctor: build.query<TDoctor, any>({
            query: (id: string) => ({
                url: `/doctors/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.doctors],
        }),
        deleteDoctor: build.mutation<TDoctor, any>({
            query: (id) => ({
                url: `/doctors/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.doctors],
        }),
        updateDoctor: build.mutation<TDoctor, any>({
            query: (args: { id: string; data: Partial<TDoctor> }) => ({
                url: `/doctors/${args.id}`,
                method: 'PATCH',
                data: args.data,
            }),
            invalidatesTags: [tagTypes.doctors],
        }),
    }),
});

export const {
    useCreateDoctorMutation,
    useGetAllDoctorsQuery,
    useGetSingleDoctorQuery,
    useDeleteDoctorMutation,
    useUpdateDoctorMutation,
} = doctorsApi;
