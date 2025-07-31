import { TAppointment, TMeta } from '@/types';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createAppointment: build.mutation<TAppointment, any>({
            query: (data) => ({
                url: '/appointments',
                method: 'POST',
                data,
            }),
            invalidatesTags: [tagTypes.appointments],
        }),
        getAllMyAppointments: build.query({
            query: (args: Record<string, unknown>) => ({
                url: '/appointments/my-appointments',
                method: 'GET',
                params: args,
            }),
            transformResponse: (response: TAppointment[], meta: TMeta) => {
                return {
                    appointments: response,
                    meta,
                };
            },
            providesTags: [tagTypes.appointments],
        }),

        // updateDoctor: build.mutation<TDoctor, any>({
        //     query: (args: { id: string; data: Partial<TDoctor> }) => ({
        //         url: `/doctors/${args.id}`,
        //         method: 'PATCH',
        //         data: args.data,
        //     }),
        //     invalidatesTags: [tagTypes.doctors],
        // }),
    }),
});

export const { useCreateAppointmentMutation, useGetAllMyAppointmentsQuery } =
    appointmentApi;
