import { TDoctor } from '@/types';
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
        getAllDoctors: build.query<TDoctor[], object>({
            query: () => ({
                url: '/doctors',
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
    }),
});

export const {
    useCreateDoctorMutation,
    useGetAllDoctorsQuery,
    useDeleteDoctorMutation,
} = doctorsApi;
